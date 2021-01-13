import { factory, db, query, mutate } from '../utils';

const LIST = `
  query list {
    users {
      id
    }
  }
`;

const READ = `
  query read($id: Int!) {
    user(id: $id) {
      id
      permissions {
        id
      }
      emails {
        id
      }
      profile {
        id
      }
      bags {
        id
      }
      discs {
        id
      }
    }
  }
`;

const CREATE = `
  mutation create($user: UserCreate) {
    createUser(user: $user) {
      id
    }
  }
`;

const UPDATE = `
  mutation update($user: UserUpdate) {
    updateUser(user: $user) {
      id
      providerId
    }
  }
`;

const DESTROY = `
  mutation destroy($user: UserDestroy) {
    destroyUser(user: $user) {
      id
    }
  }
`;


describe('Integration - User', () => {
  let record;

  before(async () => {
    record = await factory.create('User');
    const opts = { userId: record.id };
    await factory.create('Email', opts);
    await factory.create('Profile', opts);
    await factory.create('Disc', opts);
    await factory.create('Bag', opts);

    await factory.create('User', opts);

    await factory.create('User');
    await factory.create('User');
  });

  describe('Anonymous', () => {
    it('should NOT list', async () => {
      const res = await query(LIST);

      expect(res.body.data.users).to.be.null;
      expect(res.body.errors).to.exist;
      expect(res.body.errors[0].message).to.equal('Not authorized.');
    });
    it('should NOT read', async () => {
      const res = await query(READ, { id: record.id });

      expect(res.body.data.user).to.be.null;
      expect(res.body.errors).to.exist;
      expect(res.body.errors[0].message).to.equal('Not authorized.');
    });
    it('should NOT create', async () => {
      const attrs = await factory.attrs('User');
      const variables = {
        user: attrs,
      };

      const res = await mutate(CREATE, variables);

      expect(res.body.data.createUser).to.be.null;
      expect(res.body.errors).to.exist;
      expect(res.body.errors[0].message).to.equal('Not authorized.');
    });
    it('should NOT update', async () => {
      const variables = {
        user: {
          id: record.id,
          providerId: 'updated-email@example.com',
        },
      };
      const res = await mutate(UPDATE, variables);

      expect(res.body.data.updateUser).to.be.null;
      expect(res.body.errors).to.exist;
      expect(res.body.errors[0].message).to.equal('Not authorized.');
    });
    it('should NOT destroy', async () => {
      const variables = {
        user: {
          id: record.id,
        },
      };
      const res = await mutate(DESTROY, variables);

      expect(res.body.data.destroyUser).to.be.null;
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

      expect(res.body.data.users).to.be.null;
      expect(res.body.errors).to.exist;
      expect(res.body.errors[0].message).to.equal('Missing permission for user.list');
    });
    it('should NOT read', async () => {
      const res = await query(READ, { id: record.id }, token);

      expect(res.body.data.user).to.be.null;
      expect(res.body.errors).to.exist;
      expect(res.body.errors[0].message).to.equal('Missing permission for user.read');
    });
    it('should NOT create', async () => {
      const attrs = await factory.attrs('User');
      const variables = {
        user: attrs,
      };

      const res = await mutate(CREATE, variables, token);

      expect(res.body.data.createUser).to.be.null;
      expect(res.body.errors).to.exist;
      expect(res.body.errors[0].message).to.equal('Missing permission for user.create');
    });
    it('should NOT update', async () => {
      const variables = {
        user: {
          id: record.id,
          providerId: 'updated-email@example.com',
        },
      };
      const res = await mutate(UPDATE, variables, token);

      expect(res.body.data.updateUser).to.be.null;
      expect(res.body.errors).to.exist;
      expect(res.body.errors[0].message).to.equal('Missing permission for user.update');
    });
    it('should NOT destroy', async () => {
      const destroy = await factory.create('User');

      const variables = {
        user: {
          id: destroy.id,
        },
      };
      const res = await mutate(DESTROY, variables, token);

      expect(res.body.data.destroyUser).to.be.null;
      expect(res.body.errors).to.exist;
      expect(res.body.errors[0].message).to.equal('Missing permission for user.destroy');
    });
  });

  describe('User: with Permissions', () => {
    let token;
    let user;

    before(async () => {
      user = await factory.create('User');
      await user.addPermissions([
        'user.list',
        'user.read',
        'user.create',
        'user.update',
        'user.destroy',
      ]);
      token = await user.token();
    });

    it('should NOT list', async () => {
      const res = await query(LIST, undefined, token);

      expect(res.body.data.users).to.be.null;
      expect(res.body.errors).to.exist;
      expect(res.body.errors[0].message).to.equal('Denied.');
    });
    it('should NOT read', async () => {
      const res = await query(READ, { id: record.id }, token);

      expect(res.body.data.user).to.be.null;
      expect(res.body.errors).to.exist;
      expect(res.body.errors[0].message).to.equal('Denied.');
    });
    it('should NOT create', async () => {
      const attrs = await factory.attrs('User');
      const variables = {
        user: attrs,
      };

      const res = await mutate(CREATE, variables, token);

      expect(res.body.data.createUser).to.be.null;
      expect(res.body.errors).to.exist;
      expect(res.body.errors[0].message).to.equal('Denied.');
    });
    it('should NOT update', async () => {
      const variables = {
        user: {
          id: record.id,
          providerId: 'updated-email@example.com',
        },
      };
      const res = await mutate(UPDATE, variables, token);

      expect(res.body.data.updateUser).to.be.null;
      expect(res.body.errors).to.exist;
      expect(res.body.errors[0].message).to.equal('Denied.');
    });
    it('should NOT destroy', async () => {
      const destroy = await factory.create('User');

      const variables = {
        user: {
          id: destroy.id,
        },
      };
      const res = await mutate(DESTROY, variables, token);

      expect(res.body.data.destroyUser).to.be.null;
      expect(res.body.errors).to.exist;
      expect(res.body.errors[0].message).to.equal('Denied.');
    });
  });
});
