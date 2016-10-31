const User = require('../models/users');
const jwt = require('jwt-simple');

/**
 * Get all users
 * @param req
 * @param res
 * @returns {Promise|Array|{index: number, input: string}}
 */
exports.findAll = (req, res) => {
  let q = User.find({});
  q.select('-token -__v');
  return q.exec((err, doc) => res.send(doc));
}

/**
 * Create a new user
 * @param req
 * @param res
 * @returns {*}
 */
exports.create = (req, res) => {
  if (!req.body.firstName || !req.body.lastName || !req.body.email) {
    return res.status(400).send({error: 'missing field'});
  }
  return User.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email
  }, (err, doc) => {
    if (err) {
      return res.status(400).send({error: err.errmsg});
    } else {
      return res.send(doc);
    }
  });
}

/**
 * Get a single user
 * @param req
 * @param res
 * @returns {Promise|Array|{index: number, input: string}}
 */
exports.findOne = (req, res) => {
  return User
    .findById(req.params.userId)
    .select('-token')
    .exec((err, doc) => {
      if (!doc) {
        return res.status(404).send({error: 'bad user id'});
      } else {
        return res.send(doc);
      }
    });
}

exports.resetToken = (req, res) => {
  if (!req.body.email) {
    return res.status(400).send({error: 'missing email param in body'});
  }

  return User
    .findOne({email: req.body.email})
    .exec((err, doc) => {
      if (err) {
        return res.status(500).send(err);
      } else {
        return doc.resetToken((e, d) => {
          return res.send(d);
        });
      }
    });
}

exports.login = (req, res) => {
  User
    .findOne({_id: req.params.userId, token: req.params.token})
    .exec((err, doc) => {
      if (!doc) {
        return res.status(400).send({error: 'bad user id or token'});
      } else {
        const jwtToken = jwt.encode({_id: doc._id}, process.env.JWT_SECRET);
        res.cookie('token', jwtToken, {
          expires: new Date(Date.now() + (60 * 60 * 24 * 7 * 1000)),
          httpOnly: true
        });
        return res.sendStatus(200);
      }
    })
}
