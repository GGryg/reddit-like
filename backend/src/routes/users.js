const express = require('express');
const userController = require('../controllers/userController');
const checkAuth = require('../utils/checkAuth');
const router = express.Router();

router.get('/', userController.getUsers);
router.get('/current', checkAuth, userController.getCurrentUser)
router.get('/username/:username', checkAuth, userController.getUser);
router.put('/current', checkAuth, userController.updateCurrentUser);
router.put('/username/:username', checkAuth, userController.updateUser);
router.put('/changePassword', checkAuth, userController.changePassword);
router.delete('/current', checkAuth,userController.deleteCurrentUser);
router.delete('/username/:username', checkAuth, userController.deleteUser);

module.exports = router;