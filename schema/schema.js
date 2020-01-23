const graphql = require('graphql');
const { GraphQLSchema } = graphql;

const RootQueryType = require('./root_query_type.js');

module.exports = new GraphQLSchema({
  query: RootQueryType
});
