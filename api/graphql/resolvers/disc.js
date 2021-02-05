import { resolver } from 'graphql-sequelize';
import argsToFindOptions from 'graphql-sequelize/lib/argsToFindOptions';
import { generateResolvers } from '../resolver';

export default generateResolvers('Disc', ['user'], {
  Query: {
    discs: async (root, args, ctx, info) => {
      if (ctx.user.user) {
        const user = await ctx.db.User.findByPk(ctx.user.user.id);
        return user.getDiscs(argsToFindOptions(args));
      } else {
        return resolver(ctx.db.Disc)(root, args, ctx, info);
      }
    },
    disc: async (root, args, ctx, info) => {
      if (ctx.user.user) {
        const user = await ctx.db.User.findByPk(ctx.user.user.id);
        const discs = await user.getDiscs({
          where: { id: args.id },
        });
        return discs[0];
      } else {
        return resolver(ctx.db.Disc)(root, args, ctx, info);
      }
    },
  },
  Mutation: {
    createDisc: async (_, args, ctx) => {
      const currentUserId = ctx.user.user.id;
      const { userId } = args.disc;

      if (currentUserId !== userId || !currentUserId) {
        throw new Error('You are not the current user.');
      }

      const record = await ctx.db.Disc.create(args.disc);
      return record;
    },
    updateDisc: async (_, args, ctx) => {
      const currentUserId = ctx.user.user.id;
      const disc = await ctx.db.Disc.findByPk(args.disc.id);
      const { userId } = disc;

      if (currentUserId !== userId || !currentUserId) {
        throw new Error('You can not modify this entry.');
      }

      await ctx.db.Disc.update(args.disc, {
        where: {
          id: args.disc.id,
        },
      });

      return await ctx.db.Disc.findByPk(args.disc.id);
    },
    destroyDisc: async (_, args, ctx) => {
      const currentUserId = ctx.user.user.id;
      const disc = await ctx.db.Disc.findByPk(args.disc.id);
      const { userId } = disc;

      if (currentUserId !== userId || !currentUserId) {
        return new Error('You can not destroy this entry.');
      }

      await ctx.db.Disc.destroy({
        where: {
          id: args.disc.id,
        },
      });
      return true;
    },
  },
});
