const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserSchema = new Schema({
  email: {
    type: String,
    require: true,
  },
  username: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
    min: 8,
    max: 32,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  posts: [{
    type: Schema.Types.ObjectId,
    ref: 'post',
  }],
  admin: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model('user', UserSchema);
