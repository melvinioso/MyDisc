import { gql } from 'apollo-server-express';

const fields = `
  provider: String
  providerId: String
  providerKey: String
`;

export default gql`
  extend type Query {
    users: [User] @listArgs
    user: User @defaultArgs
  }

  extend type Mutation {
    createUser(user: UserCreate): User
    updateUser(user: UserUpdate): User
    destroyUser(user: UserDestroy): User
  }

  type User {
    id: Int
    ${fields}

    permissions: [Permission]
    profile: Profile
    emails: [Email]
    bags: [Bag]
    discs: [Disc]
    
    createdAt: DateTime
    updatedAt: DateTime
  }

  input UserCreate {
    ${fields}
  }

  input UserUpdate {
    id: Int!
    ${fields}
  }

  input UserDestroy {
    id: Int!
  }
`;
