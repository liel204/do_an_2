const db = require('../models');
const VectorDBService = require('./VectorDBService');
const EmbeddingService = require('./EmbeddingService');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const pdfParse = require('pdf-parse');
const mammoth = require('mammoth');

class KnowledgeService {
  async processFileAndSave(file, body) {
    let content = body.content || '';
    let status = 'processing';
    let knowledgeId = null;

    try {
      const newKnowledge = await db.Knowledge.create({
        title: body.title,
        content: '',
        category: body.category || 'general',
        file_type: file ? file.mimetype.includes('pdf') ? 'pdf' : (file.mimetype.includes('word') ? 'docx' : 'txt') : 'text',
        file_name: file ? file.originalname : null,
        status: status,
        chunk_count: 0
      });
      knowledgeId = newKnowledge.id;

      if (file) {
        if (file.mimetype.includes('pdf')) {
          const data = await pdfParse(file.buffer);
          content = data.text;
        } else if (file.mimetype.includes('word') || file.originalname.endsWith('.docx')) {
          const result = await mammoth.extractRawText({ buffer: file.buffer });
          content = result.value;
        } else {
          content = file.buffer.toString('utf-8');
        }
      }

      await newKnowledge.update({ content: content });

      // Chunk text
      const chunks = this.chunkText(content, 500, 100);
      newKnowledge.chunk_count = chunks.length;

      const ids = [];
      const documents = [];
      const metadatas = [];
      const embeddings = await EmbeddingService.generateEmbeddings(chunks);

      for (let i = 0; i < chunks.length; i++) {
        const chunkText = chunks[i];
        const vectorId = uuidv4();
        
        await db.KnowledgeChunk.create({
          knowledge_id: knowledgeId,
          chunk_text: chunkText,
          chunk_index: i,
          vector_id: vectorId
        });

        ids.push(vectorId);
        documents.push(chunkText);
        metadatas.push({ knowledge_id: knowledgeId, title: body.title, category: body.category || 'general' });
      }

      // Lưu vectors vào ChromaDB
      if(ids.length > 0) {
        await VectorDBService.addDocuments(ids, embeddings, metadatas, documents);
      }

      await newKnowledge.update({ status: 'completed' });
      return { status: 'success', data: newKnowledge };
    } catch (error) {
      console.error(error);
      if (knowledgeId) {
        await db.Knowledge.update({ status: 'error' }, { where: { id: knowledgeId } });
      }
      throw error;
    }
  }

  chunkText(text, chunkSize = 500, overlap = 100) {
    // Simple text chunker by character length
    if (!text) return [];
    text = text.replace(/\s+/g, ' ').trim();
    const chunks = [];
    let i = 0;
    while (i < text.length) {
      // Find end of sentence if possible
      let end = i + chunkSize;
      if (end >= text.length) {
        chunks.push(text.slice(i));
        break;
      }
      
      let nextSpace = text.lastIndexOf(' ', end);
      let nextDot = text.lastIndexOf('.', end);
      
      if (nextDot > i + chunkSize * 0.5) end = nextDot + 1; // Prefer dot if it's in the second half
      else if (nextSpace > i) end = nextSpace;

      chunks.push(text.slice(i, end).trim());
      i = end - overlap;
    }
    return chunks;
  }

  async getAllKnowledges() {
    return await db.Knowledge.findAll({ order: [['createdAt', 'DESC']] });
  }

  async deleteKnowledge(id) {
    const knowledge = await db.Knowledge.findByPk(id);
    if (!knowledge) throw new Error('Knowledge not found');

    try {
      const chunks = await db.KnowledgeChunk.findAll({ where: { knowledge_id: id } });
      const vectorIds = chunks.map(c => c.vector_id);

      // Delete from ChromaDB first
      if (vectorIds.length > 0) {
        await VectorDBService.deleteDocumentChunks(vectorIds);
        console.log(`Successfully deleted ${vectorIds.length} chunks from ChromaDB for knowledge ID: ${id}`);
      }

      // Then delete from database
      await db.KnowledgeChunk.destroy({ where: { knowledge_id: id } });
      await db.Knowledge.destroy({ where: { id } });

      console.log(`Successfully deleted knowledge ID: ${id} and its chunks`);
      return { status: 'success', message: 'Knowledge deleted successfully' };
    } catch (error) {
      console.error(`Error deleting knowledge ID ${id}:`, error);
      throw new Error(`Failed to delete knowledge: ${error.message}`);
    }
  }
}

module.exports = new KnowledgeService();
