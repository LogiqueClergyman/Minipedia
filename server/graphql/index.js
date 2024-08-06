import { ApolloServer } from "@apollo/server";
import { User } from "./user/index.js";
import { Post } from "./post/index.js";
import { Group } from "./group/index.js";
async function createApolloGraphqlServer() {
  const typdefs = `#graphql
    ${User.typeDefs}
    ${Post.typeDefs}
    ${Group.typeDefs}
    type Query {
      ${User.queries}
    }
    type Mutation {
      ${User.mutations}
    }` 
  const resolvers = {
    Query: {
      ...User.resolvers.queries,
    },
    Mutation: {
      ...User.resolvers.mutations
    },
  }
  const gqlServer = new ApolloServer({
    typeDefs: typdefs,
    resolvers: resolvers,
  });

  // Start the gql server
  await gqlServer.start();

  return gqlServer;
}

export default createApolloGraphqlServer;
