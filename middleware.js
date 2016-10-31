const jwt = require('jwt-simple');
const User = require('./models/users');

/**
 * Check if request has a valid user
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
exports.isAuthed = (req, res, next) => {
  return req.user ? next() : res.sendStatus(401);
}

/**
 * Check that the user is an admin
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
exports.isAdmin = (req, res, next) => {
  return req.user.admin ? next() : res.sendStatus(403);
}

/**
 * Decode user for req.user
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
exports.checkUser = (req, res, next) => {
  if (req.cookies.token) {
    const q = jwt.decode(req.cookies.token, process.env.JWT_SECRET);
    User.findById(q._id).exec((err, doc) => {
      if (doc) {
        req.user = doc;
      }
      return next();
    });
  } else {
    return next();
  }
}
