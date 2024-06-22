import express from "express";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServer } from "@apollo/server";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const PORT = Number(process.env.PORT) || 8000;

app.use(express.json());

mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log("Connected to MongoDB");
}
).catch((err) => {
  console.log("Error connecting to MongoDB", err);
});

const gqlServer = new ApolloServer({
  typeDefs: `
  type Query {
    hello: String!
  }
  type Mutation{
    addHello(name: String!): String!
  }
  `,
  resolvers: {
    Query: {},
    Mutation: {},
  },
});

await gqlServer.start();
console.log("gql server started");

app.get("/", (req, res) => {
  res.json({ message: "Server is up and running" });
});

app.use("/graphql", expressMiddleware(gqlServer));

app.listen(PORT, () => console.log(`Server started at PORT:${PORT}`));
