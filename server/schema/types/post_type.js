const graphql = require('graphql');

const {
  GraphQLObjectType, GraphQLID, GraphQLString,
} = graphql;
const mongoose = require('mongoose');

// grab the user Model so that we can return a User Object in our author field
const UserType = require('./user_type');

const User = mongoose.model('user');

const PostType = new GraphQLObjectType({
  name: 'PostType',
  fields: {
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    date: { type: GraphQLString },
    imageUrl: { type: GraphQLString },
    author: {
      type: UserType,
      resolve(parentValue) {
        return User.findById(parentValue.author)
          .then((user) => user)
          // eslint-disable-next-line no-unused-vars
          .catch((_err) => null);
      },
    },
  },
});

module.exports = PostType;
