import express from "express";
import mongoose from "mongoose";
import { ApolloServer } from "apollo-server-express";
import { typeDefs } from "./graphql/typeDefs";
import { resolvers } from "./graphql/resolvers";

const start = async () => {
  const app = express();
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  server.applyMiddleware({ app });

  try {
    await mongoose.connect(
      "mongodb+srv://oso:4bZrOfPjhZGTzqKr@cluster0.s5aro.mongodb.net/DiscsDB?retryWrites=true&w=majority",
      { useNewUrlParser: true, useUnifiedTopology: true }
    );
  } catch (err) {
    console.log(err);
  }

  app.listen(4000, () => {
    if (process.env.NODE_ENV !== "test") {
      console.log("🚀  GraphQL is now running on localhost:4000");
    }
  });
};

start();
