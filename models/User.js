const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    require: true
  },
  email: {
    type: String,
    require: true
  },
  password: {
    type: String,
    require: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  posts: [{
    type: Schema.Types.ObjectId,
    ref: 'post'
  }]
});

module.exports = mongoose.model('user', UserSchema);
