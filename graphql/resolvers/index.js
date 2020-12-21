import { merge } from 'lodash';
import GraphQLJSON from 'graphql-type-json';
import { GraphQLDateTime } from 'graphql-iso-date';

import Disc from './disc';

const scalars = {
  JSON: GraphQLJSON,
  DateTime: GraphQLDateTime,
};

const resolvers = merge(scalars, Disc);

export default resolvers;
