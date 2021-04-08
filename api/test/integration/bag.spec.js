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
      discs {
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
        bag: attrs,
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
        },
      };
      const res = await mutate(UPDATE, variables);

      expect(res.body.data.updateBag).to.be.null;
      expect(res.body.errors).to.exist;
      expect(res.body.errors[0].message).to.equal('Not authorized.');
    });
    it('should NOT destroy', async () => {
      const variables = {
        bag: {
          id: record.id,
        },
      };
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
      expect(res.body.errors[0].message).to.equal(
        'Missing permission for bag.list'
      );
    });
    it('should NOT read', async () => {
      const res = await query(READ, { id: record.id }, token);

      expect(res.body.data.bag).to.be.null;
      expect(res.body.errors).to.exist;
      expect(res.body.errors[0].message).to.equal(
        'Missing permission for bag.read'
      );
    });
    it('should NOT create', async () => {
      const attrs = await factory.attrs('Bag');
      const variables = {
        bag: attrs,
      };

      const res = await mutate(CREATE, variables, token);

      expect(res.body.data.createBag).to.be.null;
      expect(res.body.errors).to.exist;
      expect(res.body.errors[0].message).to.equal(
        'Missing permission for bag.create'
      );
    });
    it('should NOT update', async () => {
      const variables = {
        bag: {
          id: record.id,
          name: 'new name',
        },
      };
      const res = await mutate(UPDATE, variables, token);

      expect(res.body.data.updateBag).to.be.null;
      expect(res.body.errors).to.exist;
      expect(res.body.errors[0].message).to.equal(
        'Missing permission for bag.update'
      );
    });
    it('should NOT destroy', async () => {
      const variables = {
        bag: {
          id: record.id,
        },
      };
      const res = await mutate(DESTROY, variables, token);

      expect(res.body.data.destroyBag).to.be.null;
      expect(res.body.errors).to.exist;
      expect(res.body.errors[0].message).to.equal(
        'Missing permission for bag.destroy'
      );
    });
  });
  describe('User: with Permissions', () => {
    let token;
    let usr;

    before(async () => {
      usr = await factory.create('User');
      await usr.addPermissions([
        'bag.list',
        'bag.read',
        'bag.create',
        'bag.update',
        'bag.destroy',
      ]);
      token = await usr.token();
    });

    it('should not list other users', async () => {
      const otherUser = await factory.create('User');
      await factory.create('Bag', {
        userId: otherUser.id,
      });
      const res = await query(LIST, undefined, token);

      expect(res.body.data.bags.length).to.equal(0);
      expect(res.body.errors).to.be.undefined;
    });
    it('should list my own', async () => {
      const record = await factory.create('Bag', {
        userId: usr.id,
        name: 'Wells Branch',
      });
      const res = await query(LIST, undefined, token);

      expect(res.body.data.bags).to.exist;
      expect(res.body.data.bags.length).to.equal(1);
      expect(res.body.data.bags[0].id).to.equal(record.id);
      expect(res.body.errors).to.be.undefined;
    });
    it('should list my own with ordering', async () => {
      const LIST_ORDER = `
        query list {
          bags (order: "name") {
            id
            name
          }
        }
      `;

      await factory.create('Bag', {
        userId: usr.id,
        name: 'Falcon Pointe',
      });
      await factory.create('Bag', {
        userId: usr.id,
        name: 'Northtown',
      });
      const bag3 = await factory.create('Bag', {
        userId: usr.id,
        name: 'All Pro',
      });

      const res = await query(LIST_ORDER, undefined, token);

      expect(res.body.data.bags).to.exist;
      expect(res.body.data.bags.length).to.equal(4);
      expect(res.body.data.bags[0].id).to.equal(bag3.id);
      expect(res.body.errors).to.be.undefined;
    });
    it('should NOT read', async () => {
      const res = await query(READ, { id: record.id }, token);

      expect(res.body.data.bag).to.equal(null);
      expect(res.body.errors).to.be.undefined;
    });
    it('should read my own', async () => {
      const record = await factory.create('Bag', {
        userId: usr.id,
      });
      const res = await query(READ, { id: record.id }, token);

      expect(res.body.data.bag).to.exist;
      expect(res.body.data.bag.id).to.equal(record.id);
      expect(res.body.data.bag.user.id).to.exist;
      expect(res.body.errors).to.be.undefined;
    });
    it('should read my own discs', async () => {
      const disc = await factory.create('Disc', {
        userId: usr.id,
      });

      const bag = await factory.create('Bag', {
        userId: usr.id,
      });

      await disc.addToBag(bag);
      const res = await query(READ, { id: bag.id }, token);

      expect(res.body.data.bag.discs).to.exist;
      expect(res.body.data.bag.discs.length).to.equal(1);
      expect(res.body.errors).to.be.undefined;
      expect(res.body.data.bag.discs[0].id).to.equal(disc.id);
    });
    it('should NOT create', async () => {
      const otherUser = await factory.create('User');
      const attrs = await factory.attrs('Bag');
      const variables = {
        bag: {
          ...attrs,
          userId: otherUser.id,
        },
      };
      const res = await mutate(CREATE, variables, token);

      expect(res.body.data.createBag).to.be.null;
      expect(res.body.errors[0].message).to.equal(
        'You are not the current user.'
      );
    });
    it('should create my own', async () => {
      const attrs = await factory.attrs('Bag');
      const variables = {
        bag: {
          ...attrs,
          userId: usr.id,
        },
      };

      const res = await mutate(CREATE, variables, token);

      expect(res.body.data.createBag).to.exist;
      expect(res.body.errors).to.be.undefined;

      const found = await db.Bag.findByPk(res.body.data.createBag.id);
      expect(found).to.exist;
    });
    it('should NOT update', async () => {
      const otherUser = await factory.create('User');
      const variables = {
        bag: {
          id: record.id,
          name: 'new name',
          userId: otherUser.id,
        },
      };
      const res = await mutate(UPDATE, variables, token);

      expect(res.body.data.updateBag).to.be.null;
      expect(res.body.errors[0].message).to.equal(
        'You can not modify this entry.'
      );
    });
    it('should update my own', async () => {
      const record = await factory.create('Bag', {
        userId: usr.id,
      });
      const variables = {
        bag: {
          id: record.id,
          name: 'new name',
        },
      };
      const res = await mutate(UPDATE, variables, token);

      expect(res.body.data.updateBag).to.exist;
      expect(res.body.data.updateBag.name).to.equal('new name');
      expect(res.body.errors).to.be.undefined;
    });
    it('should NOT destroy', async () => {
      const destroy = await factory.create('Bag');

      const variables = {
        bag: {
          id: destroy.id,
        },
      };

      const res = await mutate(DESTROY, variables, token);

      expect(res.body.data.destroyBag).to.be.null;
      expect(res.body.errors[0].message).to.equal(
        'You can not destroy this entry.'
      );
    });
    it('should destroy my own', async () => {
      const destroy = await factory.create('Bag', {
        userId: usr.id,
      });

      const variables = {
        bag: {
          id: destroy.id,
        },
      };

      const res = await mutate(DESTROY, variables, token);

      expect(res.body.data.destroyBag).to.exist;
      expect(res.body.errors).to.be.undefined;

      const found = await db.Bag.findByPk(res.body.data.destroyBag.id);
      expect(found).to.be.null;
    });
  });
});
