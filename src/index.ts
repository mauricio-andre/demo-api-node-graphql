import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import 'reflect-metadata';
import { buildSchema } from 'type-graphql';
import { connect } from './config/database';
import { PetsResolver } from './modules/pets/graphql/resolvers/PetsResolver';
import { UsersResolver } from './modules/users/graphql/resolvers/UsersResolver';

async function init() {
  await connect();
  const app = express();
  const port = 4010;

  const schema = await buildSchema({
    resolvers: [UsersResolver, PetsResolver]
  });

  const apolloServer = new ApolloServer({
    schema
  })

  await apolloServer.start();

  apolloServer.applyMiddleware({ app });
  app.listen(port, () => console.log('Server started'));
}

init();