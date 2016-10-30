const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uuid = require('uuid');

const userSchema = new Schema({
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  token: String,
  seat: {type: Schema.Types.ObjectId, ref: 'Seat'},
  admin: Boolean,
});

userSchema.pre('save', function (next) {
  if (!this.token) {
    this.token = uuid.v4();
  }
  next();
});

userSchema.virtual('initials').get(function () {
  return this.firstName.substr(0, 1) + this.lastName.substr(0, 1);
});

userSchema.methods.resetToken = function (cb) {
  return this.model('Animal').find({type: this.type}, cb);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
