import 'graphql-import-node';
import { makeExecutableSchema } from 'graphql-tools';
import { applyMiddleware } from 'graphql-middleware';

import typeDefs from './typeDefs';
import resolvers from './resolvers';
import { permissions } from './permissions';
import { listArgs, defaultArgs } from './directives';

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
  schemaDirectives: {
    listArgs,
    defaultArgs,
  },
});

export default applyMiddleware(schema, permissions);
