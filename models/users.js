const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uuid = require('uuid');
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: true,
  auth: {user: process.env.SMTP_USER, pass: process.env.SMTP_PASS}
});

const userSchema = new Schema({
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  token: String,
  admin: Boolean,
});

userSchema.pre('save', function (next) {
  this.email = this.email.toLowerCase(); // set all email address to lower case
  if (!this.token) {
    this.token = uuid.v4();
  }
  next();
});

userSchema.virtual('initials').get(function () {
  return this.firstName.substr(0, 1) + this.lastName.substr(0, 1);
});

userSchema.methods.resetToken = function (cb) {
  this.token = uuid.v4(); // set new token
  let tokenUrl = `http://${process.env.DOMAIN}/login/${this._id}/${this.token}`;
  let mailOptions = {
    from: `"Seat Plan" <${process.env.SMTP_USER}>`,
    to: this.email,
    subject: `Here's your new magic link! 😍🙌`,
    text: `Hey ${this.firstName}, click the following link to login and select a desk ${tokenUrl}`,
    html: `<p>Hey ${this.firstName},</p>
            <p>Click the following link to login and select a desk!</p>
            <p><a href="${tokenUrl}">Login</a></p>
            <p>..of if that doesn't work copy and paste this link into your browser</p>
            <p><a href="${tokenUrl}">${tokenUrl}</a></p>`
  };

  // sent the email
  transporter.sendMail(mailOptions);

  // save the user
  this.save((err, doc) => {
    if (err) {
      return cb(err);
    }
    return cb(err, doc);
  });
};

const User = mongoose.model('User', userSchema);

module.exports = User;
