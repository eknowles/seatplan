const express = require('express');
const router = express.Router();
const UserController = require('../controllers/users');
const User = require('../models/users');
const Seat = require('../models/seats');

router.get('/', function (req, res) {
  if (!req.user) {
    return res.redirect('/help');
  }
  const data = {
    title: 'Seat Plan',
    subtitle: 'Where would you like to sit?',
    user: req.user
  };
  return res.render('index', data);
});

router.get('/help', function (req, res) {
  return res.render('reset-token', {title: 'Help', subtitle: 'Get a new login token'});
});

router.get('/logout', function (req, res) {
  res.clearCookie('token');
  return res.redirect('/');
});

router.get('/login/:userId/:token', UserController.login);

module.exports = router;
