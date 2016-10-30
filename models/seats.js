const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const seatSchema = new Schema({
  x: {type: Number, default: 0, required: true},
  y: {type: Number, default: 0, required: true},
  rotation: {type: Number, default: 0},
  width: {type: Number, default: 8},
  height: {type: Number, default: 4}
});

const Seat = mongoose.model('Seat', seatSchema);

module.exports = Seat;
