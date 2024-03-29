require('../services/env');

import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import depthLimit from 'graphql-depth-limit';
import compression from 'compression';
import cors from 'cors';
import bodyParser from 'body-parser';

import { useAuthentication } from '../authentication';

import schema from '../graphql/schema';
import context from '../graphql/context';

import config from '../config/config';

const endpoint = `${config.api.host}/graphql`;

const app = express();

app.use('*', cors());
app.use(compression());
app.use(express.json());

useAuthentication(app);

const server = new ApolloServer({
  schema,
  context,
  validationRules: [depthLimit(7)],
  introspection: true,
  playground: {
    settings: {
      'editor.theme': 'dark',
    },
    tabs: [
      {
        endpoint,
        query: `{\n  helloWorld\n}`,
      },
    ],
  },
});

server.applyMiddleware({ app, path: '/graphql' });

if (process.env.NODE_ENV !== 'test') {
  app.listen(config.port, () => {
    console.log(`🚀  GraphQL is now running on ${endpoint}`);
  });
}

export default app;
