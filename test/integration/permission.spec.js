import { factory, db, query, mutate } from '../utils';

const LIST = `
  query list {
    permissions {
      id
    }
  }
`;

const READ = `
  query read($id: Int!) {
    permission(id: $id) {
      id
    }
  }
`;

const CREATE = `
  mutation create($permission: PermissionCreate) {
    createPermission(permission: $permission) {
      id
    }
  }
`;

const UPDATE = `
  mutation update($permission: PermissionUpdate) {
    updatePermission(permission: $permission) {
      id
      key
    }
  }
`;

const DESTROY = `
  mutation destroy($permission: PermissionDestroy) {
    destroyPermission(permission: $permission) {
      id
    }
  }
`;

describe('Integration - Permission', () => {
  let record;

  before(async () => {
    record = await factory.create('Permission');
    await factory.create('Permission');
    await factory.create('Permission');
  });

  describe('Anonymous', () => {
    it('should NOT list', async () => {
      const res = await query(LIST);

      expect(res.body.data.permissions).to.be.null;
      expect(res.body.errors).to.exist;
      expect(res.body.errors[0].message).to.equal('Not authorized.');
    });
    it('should NOT read', async () => {
      const res = await query(READ, { id: record.id });

      expect(res.body.data.permission).to.be.null;
      expect(res.body.errors).to.exist;
      expect(res.body.errors[0].message).to.equal('Not authorized.');
    });
    it('should NOT create', async () => {
      const attrs = await factory.attrs('Permission');
      const variables = {
        permission: attrs
      };

      const res = await mutate(CREATE, variables);

      expect(res.body.data.createPermission).to.be.null;
      expect(res.body.errors).to.exist;
      expect(res.body.errors[0].message).to.equal('Not authorized.');
    });
    it('should NOT update', async () => {
      const variables = {
        permission: {
          id: record.id,
          key: 'permission.list',
        }
      }
      const res = await mutate(UPDATE, variables);

      expect(res.body.data.updatePermission).to.be.null;
      expect(res.body.errors).to.exist;
      expect(res.body.errors[0].message).to.equal('Not authorized.');
    });
    it('should NOT destroy', async () => {
      const variables = {
        permission: {
          id: record.id,
        }
      }
      const res = await mutate(DESTROY, variables);

      expect(res.body.data.destroyPermission).to.be.null;
      expect(res.body.errors).to.exist;
      expect(res.body.errors[0].message).to.equal('Not authorized.');
    });
  });
  describe('User: without Permissions', () => {
    let token;

    before(async () => {
      const usr = await factory.create('User');
      token = await usr.token();
    });

    it('should NOT list', async () => {
      const res = await query(LIST, undefined, token);

      expect(res.body.data.permissions).to.be.null;
      expect(res.body.errors).to.exist;
      expect(res.body.errors[0].message).to.equal('Missing permission for permission.list');
    });
    it('should NOT read', async () => {
      const res = await query(READ, { id: record.id }, token);

      expect(res.body.data.permission).to.be.null;
      expect(res.body.errors).to.exist;
      expect(res.body.errors[0].message).to.equal('Missing permission for permission.read');
    });
    it('should NOT create', async () => {
      const attrs = await factory.attrs('Permission');
      const variables = {
        permission: attrs
      };

      const res = await mutate(CREATE, variables, token);

      expect(res.body.data.createPermission).to.be.null;
      expect(res.body.errors).to.exist;
      expect(res.body.errors[0].message).to.equal('Missing permission for permission.create');
    });
    it('should NOT update', async () => {
      const variables = {
        permission: {
          id: record.id,
          key: 'permission.list',
        }
      }
      const res = await mutate(UPDATE, variables, token);

      expect(res.body.data.updatePermission).to.be.null;
      expect(res.body.errors).to.exist;
      expect(res.body.errors[0].message).to.equal('Missing permission for permission.update');
    });
    it('should NOT destroy', async () => {
      const variables = {
        permission: {
          id: record.id,
        }
      }
      const res = await mutate(DESTROY, variables, token);

      expect(res.body.data.destroyPermission).to.be.null;
      expect(res.body.errors).to.exist;
      expect(res.body.errors[0].message).to.equal('Missing permission for permission.destroy');
    });
  });
  describe('User: with Permissions', () => {
    let token;

    before(async () => {
      const usr = await factory.create('User');
      await usr.addPermissions([
        'permission.list',
        'permission.read',
        'permission.create',
        'permission.update',
        'permission.destroy',
      ]);
      token = await usr.token();
    });

    it('should list', async () => {
      const res = await query(LIST, undefined, token);

      expect(res.body.data.permissions).to.exist;
      expect(res.body.data.permissions.length).to.exist;
      expect(res.body.errors).to.be.undefined;
    });
    it('should read', async () => {
      const res = await query(READ, { id: record.id }, token);

      expect(res.body.data.permission).to.exist;
      expect(res.body.data.permission.id).to.equal(record.id);
      // expect(res.body.data.permission.user.id).to.exist;
      expect(res.body.errors).to.be.undefined;
    });
    it('should create', async () => {
      const attrs = await factory.attrs('Permission');
      const variables = {
        permission: attrs
      }
      const res = await mutate(CREATE, variables, token);

      expect(res.body.data.createPermission).to.exist;
      expect(res.body.errors).to.be.undefined;

      const found = await db.Permission.findByPk(res.body.data.createPermission.id);
      expect(found).to.exist;
    });
    it('should update', async () => {
      const variables = {
        permission: {
          id: record.id,
          key: 'permission.list',
        }
      }
      const res = await mutate(UPDATE, variables, token);

      expect(res.body.data.updatePermission).to.exist;
      expect(res.body.data.updatePermission.key).to.equal('permission.list');
      expect(res.body.errors).to.be.undefined;
    });
    it('should destroy', async () => {
      const destroy = await factory.create('Permission');

      const variables = {
        permission: {
          id: destroy.id,
        }
      }

      const res = await mutate(DESTROY, variables, token);

      expect(res.body.data.destroyPermission).to.exist;
      expect(res.body.errors).to.be.undefined;

      const found = await db.Permission.findByPk(res.body.data.destroyPermission.id);
      expect(found).to.be.null;
    });
  });
});