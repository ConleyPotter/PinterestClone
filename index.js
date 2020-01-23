const express = require("express");
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const expressGraphQL = require('express-graphql');

const app = express();
const db = require('./config/keys').mongoURI;

// all requests coming in to `graphql` will be handled
// by the expressGraphQL function from the 'express-graphql' library
app.use(
  '/graphql',
  expressGraphQL({
    graphiql: true
  })
);

// DB CONNECTION
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch(err => console.log(err));

// MIDDLEWARE
app.use(bodyParser.json());

app.listen(5000, () => console.log('Server is running on port 5000'));
