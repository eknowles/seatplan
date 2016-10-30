const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uuid = require('uuid');
const nodemailer = require('nodemailer');
let smtpConfig = {
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: true,
  auth: {user: process.env.SMTP_PASS, pass: process.env.SMTP_USER}
};
const transporter = nodemailer.createTransport(smtpConfig);

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
  // set new token
  this.token = uuid.v4();

  // save the user
  this.save((err, doc) => {
    if (err) {
      return cb(err);
    }

    let tokenUrl = `http://localhost:3000/api/users/${this._id}/login/${this.token}`;

    let mailOptions = {
      from: `"Seat Planner" <${process.env.SMTP_USER}>`,
      to: this.email,
      subject: `Your new magic link!😍🙌`,
      text: `Hey ${this.firstName}, click the following link to login and select a desk ${tokenUrl}`,
      html: `<p>Hey ${this.firstName},</p>
<p>Click the following link to login and select a desk!</p>
<p><a href="${tokenUrl}">Login</a></p>
<hr>
<p>..of if that doesn't work copy and paste this link into your browser</p>
<p><a href="${tokenUrl}">${tokenUrl}</a></p>`
    };

    // sent the email
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        return cb(error);
      }
      console.log('Message sent: ' + info.response);
      return cb(err, doc);
    });
  });
};

const User = mongoose.model('User', userSchema);

module.exports = User;
