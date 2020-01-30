/* eslint-disable no-console */
const cors = require('cors');
const express = require('express');

const app = express();

const expressGraphQL = require('express-graphql');

const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const db = require('./config/keys').mongoURI;
const User = require('./server/models/User');
const Post = require('./server/models/Post');

const schema = require('./server/schema/schema');

// DB CONNECTION
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB successfully'))
  .catch((err) => console.log(err));

app.use(bodyParser.json());
app.use(cors());

app.use('/graphql', expressGraphQL((req) => ({
  schema,
  context: {
    token: req.headers.authorization,
  },
  graphiql: true,
})));

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log('Server is running on port 5000'));
