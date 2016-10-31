const Seat = require('../models/seats');

/**
 * Create a new seat
 * @param req
 * @param res
 * @returns {req.body}
 */
exports.create = (req, res) => {
  Seat.create(req.body, (err, doc) => res.send(doc));
};

/**
 * Get a list of seats
 * @param req
 * @param res
 * @returns {Promise|Array|{index: number, input: string}}
 */
exports.findAll = (req, res) => {
  Seat.find().exec((err, doc) => res.send(doc));
};

/**
 * Get a single seat
 * @param req
 * @param res
 * @returns {Promise|Array|{index: number, input: string}}
 */
exports.findOne = (req, res) => {
  Seat.findById(req.params.seatId, (err, doc) => err || !doc ? res.send(404) : res.send(doc));
};

/**
 * Update a seat
 * @param req
 * @param res
 * @returns {Promise|Array|{index: number, input: string}}
 */
exports.update = (req, res) => {
  Seat.findById(id, (err, doc) => {
    if (req.body.name) doc.name = req.body.name;
    if (req.body.x) doc.x = req.body.x;
    if (req.body.y) doc.x = req.body.x;
    if (req.body.width) doc.width = req.body.width;
    if (req.body.height) doc.height = req.body.height;
    if (req.body.rotation) doc.rotation = req.body.rotation;
    doc.save(function (err, updatedSeat) {
      res.send(updatedSeat);
    });
  });
};

/**
 * Remove a seat
 * @param req
 * @param res
 * @returns {*}
 */
exports.delete = (req, res) => {
  return Seat.findById(req.params.seatId, (err, doc) => {
    if (err || !doc) {
      return res.send(404);
    } else {
      return doc.remove((err) => err ? res.status(500).send(err) : res.sendStatus(200));
    }
  });
};
