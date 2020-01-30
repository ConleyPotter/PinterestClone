const graphql = require('graphql');

const { GraphQLObjectType, GraphQLString, GraphQLNonNull } = graphql;
const UserType = require('./types/user_type');
const AuthService = require('../services/auth');

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    newUser: {
      type: UserType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(_, data) {
        return AuthService.register(data);
      },
    },
  },
});

module.exports = mutation;
