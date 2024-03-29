import { gql } from 'apollo-server-express';

const fields = `
  brand: String
  mold: String
  plastic: String
  color: String
  type: String
  weight: Int
  speed: Int
  glide: Int
  turn: Int
  fade: Int
  userId: Int
`;

export default gql`

  extend type Query {
    discs: [Disc] @listArgs
    disc: Disc @defaultArgs
  }

  extend type Mutation {
    createDisc(disc: DiscCreate): Disc
    updateDisc(disc: DiscUpdate): Disc
    destroyDisc(disc: DiscDestroy): Disc
    addDiscToBag(discId: Int!, bagId: Int!): Disc
  }

  type Disc {
    id: Int
    ${fields}

    user: User

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
`;
