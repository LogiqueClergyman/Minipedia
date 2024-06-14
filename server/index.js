import express from "express";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServer } from "@apollo/server";
const app = express();
const PORT = Number(process.env.PORT) || 8000;

app.use(express.json());

const gqlServer = new ApolloServer({
  typeDefs: ``,
  resolvers: {
    Query: {},
    Mutation: {},
  },
});

// Start the gql server
await gqlServer.start();

app.get("/", (req, res) => {
  res.json({ message: "Server is up and running" });
});

app.use("/graphql", expressMiddleware(gqlServer));

app.listen(PORT, () => console.log(`Server started at PORT:${PORT}`));
