const mongoose = require('mongoose');

const { Schema } = mongoose;

const PostSchema = new Schema({
  title: {
    type: String,
    require: true,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  },
  body: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  imageUrl: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('post', PostSchema);
