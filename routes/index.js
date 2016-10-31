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
  return res.render('help', {title: 'Help', subtitle: 'Having trouble?'});
});

router.post('/help', function (req, res) {
  var data = {
    title: 'Help',
    subtitle: 'Get a new login token',
    messages: []
  };
  return User
    .findOne({email: req.body.email})
    .exec((err, doc) => {
      if (err || !doc) {
        data.messages.push({
          type: 'danger',
          text: 'We couldn\'t find a user matching that email address.'
        });
        return res.render('help', data);
      } else {
        return doc.resetToken(() => {
          data.messages.push({
            type: 'success',
            text: 'An email has been sent, check your inbox for a new link.'
          });
          return res.render('help', data);
        });
      }
    });
});

router.get('/logout', function (req, res) {
  res.clearCookie('token');
  return res.redirect('/');
});

router.get('/login/:userId/:token', UserController.login);

module.exports = router;
