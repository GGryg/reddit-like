const express = require('express');
const postController = require('../controllers/postController');
const checkAuth = require('../utils/checkAuth');
const router = express.Router();

router.get('/', postController.getPosts);
router.get('/:id', postController.getPost);
router.get('/current', checkAuth, postController.getCurrentPosts);
router.post('/', checkAuth, postController.createPost);
router.put('/:id', checkAuth, postController.updatePost);
router.delete('/:id', checkAuth, postController.deletePost);

module.exports = router;