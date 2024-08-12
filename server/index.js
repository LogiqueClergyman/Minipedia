import express from "express";
import createApolloGraphqlServer from "./graphql/index.js";
import { expressMiddleware } from "@apollo/server/express4";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { decodeUser } from "./services/authentication.js";
dotenv.config();

async function init() {
  const app = express();
  const PORT = Number(process.env.PORT) || 8000;

  app.use(express.json());

  // mongoose.connect(process.env.MONGO_URI).then(() => {
  //     console.log("Connected to MongoDB");
  //   }
  //   ).catch((err) => {
  //     console.log("Error connecting to MongoDB", err);
  //   });

  // const gqlServer = ;

  // CREATE GRAPHQL SERVER
  app.use(
    "/graphql",
    expressMiddleware(await createApolloGraphqlServer(), {
      context: async ({ req }) => {
        const token = req.headers["token"];
        // console.log(token)
        try {
          const user = await decodeUser(token);
          // console.log(user)
          return {user};
        } catch (error) {
          return null;
        }
      },
    })
  );

  app.get("/", (req, res) => {
    res.json({
      msg: "server is up and running",
    });
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

init();
