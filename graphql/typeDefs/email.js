import { gql } from 'apollo-server-express';

const fields = `
  email: String
  userId: Int
`;

export default gql`

  extend type Query {
    emails: [Email] @listArgs
    email: Email @defaultArgs
  }

  extend type Mutation {
    createEmail(email: EmailCreate): Email
    updateEmail(email: EmailUpdate): Email
    destroyEmail(email: EmailDestroy): Email
  }

  type Email {
    id: Int
    ${fields}

    createdAt: DateTime
    updatedAt: DateTime
  }

  input EmailCreate {
    ${fields}
  }

  input EmailUpdate {
    id: Int!
    ${fields}
  }

  input EmailDestroy {
    id: Int!
  }
`;
