const KnowledgeService = require('../services/KnowledgeService');

class KnowledgeController {
  async uploadKnowledge(req, res) {
    try {
      const file = req.file;
      const body = req.body;
      const result = await KnowledgeService.processFileAndSave(file, body);
      return res.status(200).json(result);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ status: 'error', message: 'Upload ròt' });
    }
  }

  async getAllKnowledges(req, res) {
    try {
      const data = await KnowledgeService.getAllKnowledges();
      return res.status(200).json({ status: 'success', data });
    } catch (error) {
      return res.status(500).json({ status: 'error', message: 'Get list error' });
    }
  }

  async deleteKnowledge(req, res) {
    try {
      const id = req.params.id;
      const result = await KnowledgeService.deleteKnowledge(id);
      return res.status(200).json(result);
    } catch (error) {
      console.error('Delete knowledge error:', error);
      return res.status(500).json({ 
        status: 'error', 
        message: error.message || 'Lỗi xóa kiến thức' 
      });
    }
  }
}

module.exports = new KnowledgeController();
