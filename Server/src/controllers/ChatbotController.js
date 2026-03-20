const ChatbotService = require('../services/ChatbotService');

class ChatbotController {
  async ask(req, res) {
    try {
      const { question, sessionId } = req.body;
      if (!question) {
        return res.status(400).json({ status: 'error', message: 'Thiếu câu hỏi' });
      }
      const result = await ChatbotService.askChatbot(question, sessionId);
      return res.status(200).json({ status: 'success', data: result });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ status: 'error', message: 'Lỗi chatbot server' });
    }
  }

  async getHistory(req, res) {
    try {
      const data = await ChatbotService.getHistory();
      return res.status(200).json({ status: 'success', data });
    } catch (error) {
       return res.status(500).json({ status: 'error', message: 'Lỗi chatbot server' });
    }
  }

  async getConfig(req, res) {
    try {
      const data = await ChatbotService.getConfigs();
      return res.status(200).json({ status: 'success', data });
    } catch (error) {
       return res.status(500).json({ status: 'error', message: 'Lỗi chatbot server' });
    }
  }

  async updateConfig(req, res) {
    try {
      const newConfigs = req.body;
      const data = await ChatbotService.setConfigs(newConfigs);
      return res.status(200).json({ status: 'success', data });
    } catch (error) {
       return res.status(500).json({ status: 'error', message: 'Lỗi chatbot server' });
    }
  }
}

module.exports = new ChatbotController();
