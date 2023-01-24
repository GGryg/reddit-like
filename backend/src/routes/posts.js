const express = require('express');
const postController = require('../controllers/postController');
const checkAuth = require('../utils/checkAuth');
const router = express.Router();
const upload = require('./../multer');

router.get('/', postController.getPosts);
router.get('/:id', postController.getPost);
router.post('/', checkAuth, upload.single('picture'), postController.createPost);
router.put('/:id', checkAuth, upload.single('picture'), postController.updatePost);
router.delete('/:id', checkAuth, postController.deletePost);

module.exports = router;