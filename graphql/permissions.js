import { rule, shield, allow, and, or } from 'graphql-shield';
import { get, includes, camelCase, merge } from 'lodash';
import pluralize from 'pluralize';
import config from '../config/config';

const hasPermission = (permission) =>
  rule(`permission.${permission}`, {
    cache: 'contextual',
  })(async (_parent, _args, ctx, _info) => {
    if (!includes(get(ctx, 'user.permissions'), permission)) {
      if (config.environment !== 'production') {
        return `Missing permission for ${permission}`;
      } else {
        return 'Not authorized.';
      }
    }
    return true;
  });

const isAuthenticated = rule({ cache: 'contextual' })(
  async (_root, _args, ctx, _info) => {
    if (ctx.user === null || ctx.user === undefined) {
      return 'Not authorized.';
    }

    return true;
  }
);

const notAllowed = rule()(async () => 'Not allowed.');

const modelKeys = [
  'Disc',
  'Bag',
  'Profile',
  'Email',
  // 'User',
  // 'Permission',
];

const defaultPermissions = modelKeys.reduce(
  (memo, modelName) => {
    const singular = camelCase(modelName);
    const plural = pluralize(singular);

    memo.Query[plural] = and(
      isAuthenticated,
      hasPermission(`${singular}.list`)
    );
    memo.Query[singular] = and(
      isAuthenticated,
      hasPermission(`${singular}.read`)
    );

    memo.Mutation[`create${modelName}`] = and(
      isAuthenticated,
      hasPermission(`${singular}.create`)
    );
    memo.Mutation[`update${modelName}`] = and(
      isAuthenticated,
      hasPermission(`${singular}.update`)
    );
    memo.Mutation[`destroy${modelName}`] = and(
      isAuthenticated,
      hasPermission(`${singular}.destroy`)
    );

    memo[modelName] = isAuthenticated;

    return memo;
  },
  { Query: {}, Mutation: {}, Subscription: {} }
);

export const permissions = shield(
  merge(defaultPermissions, {
    Query: {},
    Mutation: {},
  }),
  {
    allowExternalErrors: true,
    fallbackRule: allow,
  }
);
