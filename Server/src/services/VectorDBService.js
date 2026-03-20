const { ChromaClient } = require('chromadb');

class VectorDBService {
  constructor() {
    this.client = new ChromaClient({ path: 'http://localhost:8080' });
    this.collectionName = 'chatbot_knowledge_vn_1';
    this.collection = null;
  }

  async init() {
    if (!this.collection) {
      try {
        const dummyEmbeddingFunction = {
          generate: async (texts) => {
            return texts.map(() => Array(384).fill(0.0));
          }
        };

        this.collection = await this.client.getOrCreateCollection({
          name: this.collectionName,
          embeddingFunction: dummyEmbeddingFunction,
        });
        console.log(`ChromaDB collection '${this.collectionName}' initialized.`);
      } catch (error) {
        console.error('Error initializing ChromaDB collection:', error);
      }
    }
    return this.collection;
  }

  async addDocuments(ids, embeddings, metadatas, documents) {
    const col = await this.init();
    await col.add({
      ids: ids,
      embeddings: embeddings,
      metadatas: metadatas,
      documents: documents,
    });
  }

  async searchSimilar(embedding, nResults = 5) {
    const col = await this.init();
    const results = await col.query({
      queryEmbeddings: [embedding],
      nResults: nResults,
    });
    return results;
  }

  async deleteDocumentChunks(ids) {
    const col = await this.init();
    if(ids && ids.length > 0) {
      await col.delete({ ids: ids });
      // Refresh collection cache after deletion to ensure data is updated
      this.collection = null;
      await this.init();
      console.log(`Deleted ${ids.length} document chunks from ChromaDB`);
    }
  }

  // Method to force refresh collection cache
  async refreshCollection() {
    this.collection = null;
    return await this.init();
  }
}

module.exports = new VectorDBService();
