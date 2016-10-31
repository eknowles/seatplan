const express = require('express');
const router = express.Router();
const UserController = require('../controllers/users');

router.get('/', function (req, res) {
  return res.render('index', {title: 'Seat Plan', subtitle: 'Where would you like to sit?'});
});

router.get('/help', function (req, res) {
  return res.render('reset-token', {title: 'Help', subtitle: 'Get a new login token'});
});

router.get('/login/:userId/:token', UserController.login);

module.exports = router;
