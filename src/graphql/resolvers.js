import { Disc } from "./models/disc";

export const resolvers = {
  Query: {
    discs: () => Disc.find(),
  },
  Mutation: {
    createDisc: async (_, args) => {
      const disc = new Disc(args.disc);
      await disc.save();
      return disc;
    },
  },
};
