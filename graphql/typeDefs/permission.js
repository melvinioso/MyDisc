import { gql } from 'apollo-server-express';

const fields = `
  key: String
  userId: Int
`;

export default gql`

  extend type Query {
    permissions: [Permission] @listArgs
    permission: Permission @defaultArgs
  }

  extend type Mutation {
    createPermission(permission: PermissionCreate): Permission
    updatePermission(permission: PermissionUpdate): Permission
    destroyPermission(permission: PermissionDestroy): Permission
  }

  type Permission {
    id: Int
    ${fields}

    user: User

    createdAt: DateTime
    updatedAt: DateTime
  }

  input PermissionCreate {
    ${fields}
  }

  input PermissionUpdate {
    id: Int!
    ${fields}
  }

  input PermissionDestroy {
    id: Int!
  }
`;
