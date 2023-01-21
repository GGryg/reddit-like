const express = require('express');
const commentController = require('../controllers/commentController');
const checkAuth = require('../utils/checkAuth');
const router = express.Router();

router.get('/', commentController.getComments);
router.get('/:id', commentController.getComment);
router.get('/current', checkAuth, commentController.getCurrentComments);
router.post('/', checkAuth, commentController.createComment);
router.put('/:id', checkAuth, commentController.updateComment);
router.delete('/:id', checkAuth, commentController.deleteComment);

module.exports = router;