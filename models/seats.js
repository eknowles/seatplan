const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const seatSchema = new Schema({
  name: String,
  x: {type: Number, default: 0, required: true},
  y: {type: Number, default: 0, required: true},
  rotation: {type: Number, default: 0},
  width: {type: Number, default: 8},
  height: {type: Number, default: 4},
  existing: [{type: Schema.Types.ObjectId, ref: 'User'}],
  proposed: [{type: Schema.Types.ObjectId, ref: 'User'}]
});

const Seat = mongoose.model('Seat', seatSchema);

module.exports = Seat;
