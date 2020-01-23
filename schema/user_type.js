const graphql = require('graphql');
const { GraphQLObjectType, GraphQLID, GraphQLString  } = graphql;

const UserType = new GraphQLObjectType({
  name: "UserType",
  fields: {
    id: { type: GraphQLID }, // Mongoose automatically generates an ID field for our models
    name: { type: GraphQLString },
    email: { type: GraphQLString }
  }
});

module.exports = UserType;
