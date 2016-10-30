var express = require('express');
var router = express.Router();
var User = require('../models/users');

/**
 * Get all users
 */
router.get('/', function (req, res) {
  let q = User.find({});
  q.select('-token -__v');
  q.exec((err, doc) => res.send(doc));
});

/**
 * Create User
 */
router.post('/', function (req, res) {
  if (!req.body.firstName || !req.body.lastName || !req.body.email) {
    return res.status(400).send({error: 'missing field'});
  }
  User.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email
  }, (err, doc) => {
    if (err) {
      return res.status(500).send(err);
    } else {
      return res.send(doc);
    }
  });
});

/**
 * Generate new token for a user
 */
router.get('/:userId/resetToken', function (req, res) {
  User.findById(req.param('userId'), (err, doc) => {
    if (err) {
      return res.status(500).send(err);
    } else {
      return res.send(doc);
    }
  });
});

/**
 * Get a single user
 */
router.get('/:userId', function (req, res) {
  User
    .findById(req.params.userId)
    .select('-token')
    .exec((err, doc) => {
      if (!doc) {
        return res.status(404).send({error: 'bad user id'});
      } else {
        return res.send(doc);
      }
    });
});

/**
 * Login
 */
router.get('/:userId/login/:token', function (req, res) {
  User
    .findOne({_id: req.params.userId, token: req.params.token})
    .exec((err, doc) => {
      if (!doc) {
        return res.status(400).send({error: 'bad user id or token'});
      } else {
        return res.send(doc);
      }
    })
})

module.exports = router;
