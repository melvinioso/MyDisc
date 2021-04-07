import { resolver } from 'graphql-sequelize';
import argsToFindOptions from 'graphql-sequelize/lib/argsToFindOptions';
import { generateResolvers } from '../resolver';

export default generateResolvers('Bag', ['user', 'discs'], {
  Query: {
    bags: async (root, args, ctx, info) => {
      if (ctx.user.user) {
        const user = await ctx.db.User.findByPk(ctx.user.user.id);
        return user.getBags(argsToFindOptions(args));
      } else {
        return resolver(ctx.db.Bag)(root, args, ctx, info);
      }
    },
    bag: async (root, args, ctx, info) => {
      if (ctx.user.user) {
        const user = await ctx.db.User.findByPk(ctx.user.user.id);
        const bags = await user.getBags({
          where: { id: args.id },
        });
        return bags[0];
      } else {
        return resolver(ctx.db.Bag)(root, args, ctx, info);
      }
    },
  },
  Mutation: {
    createBag: async (_, args, ctx) => {
      const currentUserId = ctx.user.user.id;
      const { userId } = args.bag;

      if (currentUserId !== userId || !currentUserId) {
        throw new Error('You are not the current user.');
      }

      const record = await ctx.db.Bag.create(args.bag);
      return record;
    },
    updateBag: async (_, args, ctx) => {
      const currentUserId = ctx.user.user.id;
      const bag = await ctx.db.Bag.findByPk(args.bag.id);
      const { userId } = bag;

      if (currentUserId !== userId || !currentUserId) {
        throw new Error('You can not modify this entry.');
      }

      await ctx.db.Bag.update(args.bag, {
        where: {
          id: args.bag.id,
        },
      });

      return await ctx.db.Bag.findByPk(args.bag.id);
    },
    destroyBag: async (_, args, ctx) => {
      const currentUserId = ctx.user.user.id;
      const bag = await ctx.db.Bag.findByPk(args.bag.id);
      const { userId } = bag;

      if (currentUserId !== userId || !currentUserId) {
        return new Error('You can not destroy this entry.');
      }

      await ctx.db.Bag.destroy({
        where: {
          id: args.bag.id,
        },
      });
      return true;
    },
  },
});
