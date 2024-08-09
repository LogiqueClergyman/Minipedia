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
      ${Post.queries}
      ${Group.queries}
    }
    type Mutation {
      ${User.mutations}
      ${Post.mutations}
      ${Group.mutations}
    }`;
  const resolvers = {
    Query: {
      ...User.resolvers.queries,
      ...Post.resolvers.queries,
      ...Group.resolvers.queries,
    },
    Mutation: {
      ...User.resolvers.mutations,
      ...Post.resolvers.mutations,
      ...Group.resolvers.mutations,
    },
    Post: {
      ...Post.resolvers.Post,
    },
  };

  // console.log(typdefs);
  const gqlServer = new ApolloServer({
    typeDefs: typdefs,
    resolvers: resolvers,
  });

  // Start the gql server
  await gqlServer.start();

  return gqlServer;
}

export default createApolloGraphqlServer;
