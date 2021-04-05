import { gql } from 'apollo-server-express';

const fields = `
  brand: String
  mold: String
  plastic: String
  color: String
  weight: Int
  speed: Int
  glide: Int
  turn: Int
  fade: Int
  userId: Int
`;

const discBagFields = `
  discId: Int
  bagId: Int
`;

export default gql`

  extend type Query {
    discs: [Disc] @listArgs
    disc: Disc @defaultArgs
    discBags: [DiscBag] @listArgs
    discBag: DiscBag @defaultArgs
  }

  extend type Mutation {
    createDisc(disc: DiscCreate): Disc
    updateDisc(disc: DiscUpdate): Disc
    destroyDisc(disc: DiscDestroy): Disc
    createDiscBag(disc: DiscBagCreate): DiscBag
  }

  type Disc {
    id: Int
    ${fields}

    user: User

    createdAt: DateTime
    updatedAt: DateTime
  }

  type DiscBag {
    ${discBagFields}

    disc: Disc
    bag: Bag

    createdAt: DateTime
    updatedAt: DateTime
  }

  input DiscCreate {
    ${fields}
  }

  input DiscUpdate {
    id: Int!
    ${fields}
  }

  input DiscDestroy {
    id: Int!
  }

  input DiscBagCreate {
    ${discBagFields}
  }
`;
