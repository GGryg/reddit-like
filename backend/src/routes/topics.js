const express = require('express');
const topicController = require('../controllers/topicController');
const checkAuth = require('../utils/checkAuth');
const router = express.Router();
const upload = require('./../multer');

router.get('/', topicController.getTopics);
router.get('/:topicName', topicController.getTopic)
router.post('/', checkAuth, upload.single('picture'), topicController.createTopic);
router.put('/:topicName', checkAuth, upload.single('picture'), topicController.updateTopic);
router.delete('/:topicName', checkAuth, topicController.deleteTopic);

module.exports = router;