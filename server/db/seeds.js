/* eslint-disable no-console */
const mongoose = require('mongoose');
const faker = require('faker');
const fetch = require('node-fetch');

global.fetch = fetch;


const Post = require('../models/Post');
const User = require('../models/User');
const db = require('../../config/keys').mongoURI;

const userBatch = [];
const postBatch = [];

for (let i = 0; i < 30; i++) {
  const user = new User({
    email: faker.internet.email(),
    username: faker.internet.userName(),
    password: faker.internet.password(10),
    admin: false,
  });

  userBatch.push(user);
}

const userDump = async () => {
  mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      console.log('Connected to MongoDB Successfully for User Batch');
      User.insertMany(userBatch, (err, docs) => {
        if (err) throw err;
        else {
          for (let i = 0; i < docs.length; i++) {
            console.log(docs[i].username);
          }
        }
      });
    });
};

const demoUser = new User({
  username: 'conleypotter',
  email: 'conley@email.com',
  password: 'password',
});

demoUser.save();

for (let i = 0; i < 50; i++) {
  const rand = Math.floor(Math.random() * 190727);
  const randomCollectionId = Math.floor(Math.random() * 30);
  const post = new Post({
    title: faker.random.words(5),
    author: User.findOne().skip(rand).username,
    imageUrl: `https://source.unsplash.com/random/${randomCollectionId}`,
  });

  postBatch.push(post);
}

const postDump = async () => {
  mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      console.log('Connected to MongoDB Successfully for Post Batch');
      Post.insertMany(postBatch, (err, docs) => {
        if (err) throw err;
        else {
          for (let i = 0; i < docs.length; i++) {
            console.log(docs[i].title);
          }
        }
      });
    });
};

userDump();
postDump();
