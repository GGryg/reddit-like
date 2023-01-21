const express = require('express');
const topicController = require('../controllers/topicController');
const checkAuth = require('../utils/checkAuth');
const router = express.Router();

router.get('/', topicController.getTopics);
router.get('/:topicName', topicController.getTopic)
router.post('/', checkAuth, topicController.createTopic);
router.put('/:topicName', checkAuth, topicController.updateTopic);
router.delete('/:topicName', checkAuth, topicController.deleteTopic);

module.exports = router;