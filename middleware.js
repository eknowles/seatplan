const jwt = require('jwt-simple');

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
