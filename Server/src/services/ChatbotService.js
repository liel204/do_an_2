const Groq = require('groq-sdk');
const db = require('../models');
const VectorDBService = require('./VectorDBService');
const EmbeddingService = require('./EmbeddingService');

class ChatbotService {
  constructor() {
    this.apiKey = process.env.GROQ_API_KEY || 'dummy_key';
    this.groq = new Groq({ apiKey: this.apiKey });
    this.modelName = 'llama-3.1-8b-instant'; // Cập nhật model do bản cũ bị khai tử
  }

  async askChatbot(question, sessionId) {
    try {
      const start = Date.now();
      
      // 1. Sinh embedding cho câu hỏi
      const queryEmbedding = await EmbeddingService.generateEmbedding(question);

      // 2. Tìm vector tương tự
      const searchResults = await VectorDBService.searchSimilar(queryEmbedding, 5);

      let contextText = '';
      let sources = [];
      const threshold = 0.5; // distance threshold

      if (searchResults && searchResults.documents && searchResults.documents[0].length > 0) {
        // Chroma trả về mảng 2 chiều
        const docs = searchResults.documents[0];
        const metas = searchResults.metadatas[0];
        const distances = searchResults.distances ? searchResults.distances[0] : docs.map(() => 0);

        console.log("Vector Search Results:");
        for (let i = 0; i < docs.length; i++) {
          console.log(`- Doc[${i}] Distance: ${distances[i]} | Content: ${docs[i]}`);
          // Bỏ qua lọc threshold độ khó, luôn gửi Top 5 cho AI đọc và chắt lọc
          contextText += `---\n[${metas[i].title}]: ${docs[i]}\n`;
          sources.push(metas[i].title);
        }
      }

      // 3. Build prompt
      const systemPrompt = `Bạn là trợ lý ảo AI thông minh tư vấn bán hàng cho website e-commerce. Hãy trả lời câu hỏi của người dùng dựa trên KIẾN THỨC CUNG CẤP bên dưới.
Nếu bạn không tìm thấy câu trả lời trong kiến thức cung cấp, hãy nói "Xin lỗi, tôi chưa có thông tin về vấn đề này." và gợi ý họ liên hệ hỗ trợ.
LUÔN TRẢ LỜI BẰNG TIẾNG VIỆT, ngắn gọn, lịch sự.

KIẾN THỨC CUNG CẤP:
${contextText.trim() === '' ? 'Hiện không có kiến thức.' : contextText}`;

      // 4. Gọi LLM Groq
      const completion = await this.groq.chat.completions.create({
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: question },
        ],
        model: this.modelName,
        temperature: 0.7,
        max_tokens: 1024,
      });

      const botAnswer = completion.choices[0]?.message?.content || "Lỗi xử lý LLM.";
      const end = Date.now();

      // 5. Lưu Chat History
      await db.ChatHistory.create({
        session_id: sessionId || 'default_session',
        user_question: question,
        bot_answer: botAnswer,
        sources: Array.from(new Set(sources)),
        response_time: end - start
      });

      return {
        answer: botAnswer,
        sources: Array.from(new Set(sources))
      };

    } catch (error) {
      console.error('ChatbotService Error:', error);
      throw error;
    }
  }

  async getHistory() {
    return await db.ChatHistory.findAll({ order: [['createdAt', 'DESC']] });
  }

  async getConfigs() {
    const configs = await db.ChatbotConfig.findAll();
    return configs.reduce((acc, c) => {
      acc[c.config_key] = c.config_value;
      return acc;
    }, {});
  }

  async setConfigs(newConfigs) {
    for (const key in newConfigs) {
      await db.ChatbotConfig.upsert({ config_key: key, config_value: newConfigs[key] });
    }
    return await this.getConfigs();
  }
}

module.exports = new ChatbotService();
