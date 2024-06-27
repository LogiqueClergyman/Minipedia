import { ApolloServer } from "@apollo/server";
import { User } from "./User/index.js";
import { createUser } from "../routes.js/authentication.js";

async function createApolloGraphqlServer() {
  const mut = User.resolvers.mutations;
  console.log(mut)
  const typdefs = `#graphql
    type Query {
      hello: String
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
