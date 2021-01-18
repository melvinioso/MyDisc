import { gql } from 'apollo-server-express';

const fields = `
  name: String
  capacity: Int
  userId: Int
`;

export default gql`

  extend type Query {
    bags: [Bag] @listArgs
    bag: Bag @defaultArgs
  }

  extend type Mutation {
    createBag(bag: BagCreate): Bag
    updateBag(bag: BagUpdate): Bag
    destroyBag(bag: BagDestroy): Bag
  }

  type Bag {
    id: Int
    ${fields}

    user: User

    createdAt: DateTime
    updatedAt: DateTime
  }

  input BagCreate {
    ${fields}
  }

  input BagUpdate {
    id: Int!
    ${fields}
  }

  input BagDestroy {
    id: Int!
  }
`;
