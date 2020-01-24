const express = require("express");
const app = express();

const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const db = require('./config/keys').mongoURI;
const User = require("./models/user");
const Post = require('./models/post');

const expressGraphQL = require('express-graphql');
const schema = require("./schema/schema");

// DB CONNECTION
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch(err => console.log(err));

app.use(bodyParser.json());

app.use('/graphql', expressGraphQL({
  schema,
  graphiql: true
}));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log('Server is running on port 5000'));
