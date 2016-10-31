const express = require('express');
const router = express.Router();
const UserController = require('../../controllers/users');
const middleware = require('../../middleware.js');

router.get('/', UserController.findAll);
router.get('/:userId', UserController.findOne);
router.post('/resetToken', UserController.resetToken);
router.post('/', UserController.create);

module.exports = router;
