const express = require('express');
const router = express.Router();
const UserController = require('../../controllers/users');
const middleware = require('../../middleware.js');

router.get('/', middleware.isAuthed, UserController.findAll);
router.post('/', UserController.create);
router.get('/:userId/reset', middleware.isAuthed, UserController.resetToken);
router.get('/:userId', UserController.findOne);
router.get('/:userId/login/:token', UserController.login)

module.exports = router;
