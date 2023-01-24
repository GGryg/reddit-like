const express = require('express');
const userController = require('../controllers/userController');
const checkAuth = require('../utils/checkAuth');
const router = express.Router();
const upload = require('./../multer');

router.get('/', userController.getUsers);
router.get('/current', checkAuth, userController.getCurrentUser)
router.get('/user/:id', userController.getUser);
router.put('/current', checkAuth, upload.single('picture'), userController.updateCurrentUser);
router.put('/user/:id', checkAuth, upload.single('picture'), userController.updateUser);
router.delete('/current', checkAuth,userController.deleteCurrentUser);
router.delete('/user/:id', checkAuth, userController.deleteUser);

module.exports = router;