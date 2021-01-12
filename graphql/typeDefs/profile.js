import { gql } from 'apollo-server-express';

const fields = `
  name: String
  userId: Int
`;

export default gql`

  extend type Query {
    profiles: [Profile] @listArgs
    profile: Profile @defaultArgs
  }

  extend type Mutation {
    createProfile(profile: ProfileCreate): Profile
    updateProfile(profile: ProfileUpdate): Profile
    destroyProfile(profile: ProfileDestroy): Profile
  }

  type Profile {
    id: Int
    ${fields}

    createdAt: DateTime
    updatedAt: DateTime
  }

  input ProfileCreate {
    ${fields}
  }

  input ProfileUpdate {
    id: Int!
    ${fields}
  }

  input ProfileDestroy {
    id: Int!
  }
`;
