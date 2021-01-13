import { merge } from 'lodash';
import GraphQLJSON from 'graphql-type-json';
import { GraphQLDateTime } from 'graphql-iso-date';

import Disc from './disc';
import Bag from './bag';
import Profile from './profile';
import Email from './email';
import Permission from './permission';
import User from './user';

const scalars = {
  JSON: GraphQLJSON,
  DateTime: GraphQLDateTime,
};

const resolvers = merge(scalars, Disc, Bag, Profile, Email, Permission, User);

export default resolvers;
