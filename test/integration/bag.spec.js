import { factory, db, query, mutate } from '../utils';

const LIST = `
  query list {
    bags {
      id
    }
  }
`;

const READ = `
  query read($id: Int!) {
    bag(id: $id) {
      id
      user {
        id
      }
    }
  }
`;

const CREATE = `
  mutation create($bag: BagCreate) {
    createBag(bag: $bag) {
      id
    }
  }
`;

const UPDATE = `
  mutation update($bag: BagUpdate) {
    updateBag(bag: $bag) {
      id
      name
    }
  }
`;

const DESTROY = `
  mutation destroy($bag: BagDestroy) {
    destroyBag(bag: $bag) {
      id
    }
  }
`;

describe('Integration - Bag', () => {
  let record;

  before(async () => {
    record = await factory.create('Bag');
    await factory.create('Bag');
    await factory.create('Bag');
  });

  describe('Anonymous', () => {
    it('should NOT list', async () => {
      const res = await query(LIST);

      expect(res.body.data.bags).to.be.null;
      expect(res.body.errors).to.exist;
      expect(res.body.errors[0].message).to.equal('Not authorized.');
    });
    it('should NOT read', async () => {
      const res = await query(READ, { id: record.id });

      expect(res.body.data.bag).to.be.null;
      expect(res.body.errors).to.exist;
      expect(res.body.errors[0].message).to.equal('Not authorized.');
    });
    it('should NOT create', async () => {
      const attrs = await factory.attrs('Bag');
      const variables = {
        bag: attrs
      };

      const res = await mutate(CREATE, variables);

      expect(res.body.data.createBag).to.be.null;
      expect(res.body.errors).to.exist;
      expect(res.body.errors[0].message).to.equal('Not authorized.');
    });
    it('should NOT update', async () => {
      const variables = {
        bag: {
          id: record.id,
          name: 'new name',
        }
      }
      const res = await mutate(UPDATE, variables);

      expect(res.body.data.updateBag).to.be.null;
      expect(res.body.errors).to.exist;
      expect(res.body.errors[0].message).to.equal('Not authorized.');
    });
    it('should NOT destroy', async () => {
      const variables = {
        bag: {
          id: record.id,
        }
      }
      const res = await mutate(DESTROY, variables);

      expect(res.body.data.destroyBag).to.be.null;
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

      expect(res.body.data.bags).to.be.null;
      expect(res.body.errors).to.exist;
      expect(res.body.errors[0].message).to.equal('Missing permission for bag.list');
    });
    it('should NOT read', async () => {
      const res = await query(READ, { id: record.id }, token);

      expect(res.body.data.bag).to.be.null;
      expect(res.body.errors).to.exist;
      expect(res.body.errors[0].message).to.equal('Missing permission for bag.read');
    });
    it('should NOT create', async () => {
      const attrs = await factory.attrs('Bag');
      const variables = {
        bag: attrs
      };

      const res = await mutate(CREATE, variables, token);

      expect(res.body.data.createBag).to.be.null;
      expect(res.body.errors).to.exist;
      expect(res.body.errors[0].message).to.equal('Missing permission for bag.create');
    });
    it('should NOT update', async () => {
      const variables = {
        bag: {
          id: record.id,
          name: 'new name',
        }
      }
      const res = await mutate(UPDATE, variables, token);

      expect(res.body.data.updateBag).to.be.null;
      expect(res.body.errors).to.exist;
      expect(res.body.errors[0].message).to.equal('Missing permission for bag.update');
    });
    it('should NOT destroy', async () => {
      const variables = {
        bag: {
          id: record.id,
        }
      }
      const res = await mutate(DESTROY, variables, token);

      expect(res.body.data.destroyBag).to.be.null;
      expect(res.body.errors).to.exist;
      expect(res.body.errors[0].message).to.equal('Missing permission for bag.destroy');
    });
  });
  describe('User: with Permissions', () => {
    let token;

    before(async () => {
      const usr = await factory.create('User');
      await usr.addPermissions([
        'bag.list',
        'bag.read',
        'bag.create',
        'bag.update',
        'bag.destroy',
      ]);
      token = await usr.token();
    });

    it('should list', async () => {
      const res = await query(LIST, undefined, token);

      expect(res.body.data.bags).to.exist;
      expect(res.body.data.bags.length).to.exist;
      expect(res.body.errors).to.be.undefined;
    });
    it('should read', async () => {
      const res = await query(READ, { id: record.id }, token);

      expect(res.body.data.bag).to.exist;
      expect(res.body.data.bag.id).to.equal(record.id);
      expect(res.body.data.bag.user.id).to.exist;
      expect(res.body.errors).to.be.undefined;
    });
    it('should create', async () => {
      const attrs = await factory.attrs('Bag');
      const variables = {
        bag: attrs
      }
      const res = await mutate(CREATE, variables, token);

      expect(res.body.data.createBag).to.exist;
      expect(res.body.errors).to.be.undefined;

      const found = await db.Bag.findByPk(res.body.data.createBag.id);
      expect(found).to.exist;
    });
    it('should update', async () => {
      const variables = {
        bag: {
          id: record.id,
          name: 'new name',
        }
      }
      const res = await mutate(UPDATE, variables, token);

      expect(res.body.data.updateBag).to.exist;
      expect(res.body.data.updateBag.name).to.equal('new name');
      expect(res.body.errors).to.be.undefined;
    });
    it('should destroy', async () => {
      const destroy = await factory.create('Bag');

      const variables = {
        bag: {
          id: destroy.id,
        }
      }

      const res = await mutate(DESTROY, variables, token);

      expect(res.body.data.destroyBag).to.exist;
      expect(res.body.errors).to.be.undefined;

      const found = await db.Bag.findByPk(res.body.data.destroyBag.id);
      expect(found).to.be.null;
    });
  });
});