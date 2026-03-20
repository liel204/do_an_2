const express = require('express');
const router = express.Router();
const ChatbotController = require('../controllers/ChatbotController');
const KnowledgeController = require('../controllers/KnowledgeController');
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

// Chatbot API
router.post('/chatbot/ask', ChatbotController.ask);
router.get('/chatbot/history', ChatbotController.getHistory);
router.get('/chatbot/config', ChatbotController.getConfig);
router.put('/chatbot/config', ChatbotController.updateConfig);

// Knowledge Admin API
router.post('/knowledge/upload', upload.single('file'), KnowledgeController.uploadKnowledge);
router.get('/knowledge', KnowledgeController.getAllKnowledges);
router.delete('/knowledge/:id', KnowledgeController.deleteKnowledge);

module.exports = router;
