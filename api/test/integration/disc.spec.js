import { factory, db, query, mutate } from '../utils';

const LIST = `
  query list {
    discs {
      id
    }
  }
`;

const READ = `
  query read($id: Int!) {
    disc(id: $id) {
      id
      user {
        id
      }
    }
  }
`;

const CREATE = `
  mutation create($disc: DiscCreate) {
    createDisc(disc: $disc) {
      id
    }
  }
`;

const UPDATE = `
  mutation update($disc: DiscUpdate) {
    updateDisc(disc: $disc) {
      id
      brand
    }
  }
`;

const DESTROY = `
  mutation destroy($disc: DiscDestroy) {
    destroyDisc(disc: $disc) {
      id
    }
  }
`;

describe('Integration - Disc', () => {
  let record;

  before(async () => {
    record = await factory.create('Disc');
    await factory.create('Disc');
    await factory.create('Disc');
  });

  describe('Anonymous', () => {
    it('should NOT list', async () => {
      const res = await query(LIST);

      expect(res.body.data.discs).to.be.null;
      expect(res.body.errors).to.exist;
      expect(res.body.errors[0].message).to.equal('Not authorized.');
    });
    it('should NOT read', async () => {
      const res = await query(READ, { id: record.id });

      expect(res.body.data.disc).to.be.null;
      expect(res.body.errors).to.exist;
      expect(res.body.errors[0].message).to.equal('Not authorized.');
    });
    it('should NOT create', async () => {
      const attrs = await factory.attrs('Disc');
      const variables = {
        disc: attrs,
      };

      const res = await mutate(CREATE, variables);

      expect(res.body.data.createDisc).to.be.null;
      expect(res.body.errors).to.exist;
      expect(res.body.errors[0].message).to.equal('Not authorized.');
    });
    it('should NOT update', async () => {
      const variables = {
        disc: {
          id: record.id,
          brand: 'new brand',
        },
      };
      const res = await mutate(UPDATE, variables);

      expect(res.body.data.updateDisc).to.be.null;
      expect(res.body.errors).to.exist;
      expect(res.body.errors[0].message).to.equal('Not authorized.');
    });
    it('should NOT destroy', async () => {
      const variables = {
        disc: {
          id: record.id,
        },
      };
      const res = await mutate(DESTROY, variables);

      expect(res.body.data.destroyDisc).to.be.null;
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

      expect(res.body.data.discs).to.be.null;
      expect(res.body.errors).to.exist;
      expect(res.body.errors[0].message).to.equal(
        'Missing permission for disc.list'
      );
    });
    it('should NOT read', async () => {
      const res = await query(READ, { id: record.id }, token);

      expect(res.body.data.disc).to.be.null;
      expect(res.body.errors).to.exist;
      expect(res.body.errors[0].message).to.equal(
        'Missing permission for disc.read'
      );
    });
    it('should NOT create', async () => {
      const attrs = await factory.attrs('Disc');
      const variables = {
        disc: attrs,
      };

      const res = await mutate(CREATE, variables, token);

      expect(res.body.data.createDisc).to.be.null;
      expect(res.body.errors).to.exist;
      expect(res.body.errors[0].message).to.equal(
        'Missing permission for disc.create'
      );
    });
    it('should NOT update', async () => {
      const variables = {
        disc: {
          id: record.id,
          brand: 'new brand',
        },
      };
      const res = await mutate(UPDATE, variables, token);

      expect(res.body.data.updateDisc).to.be.null;
      expect(res.body.errors).to.exist;
      expect(res.body.errors[0].message).to.equal(
        'Missing permission for disc.update'
      );
    });
    it('should NOT destroy', async () => {
      const variables = {
        disc: {
          id: record.id,
        },
      };
      const res = await mutate(DESTROY, variables, token);

      expect(res.body.data.destroyDisc).to.be.null;
      expect(res.body.errors).to.exist;
      expect(res.body.errors[0].message).to.equal(
        'Missing permission for disc.destroy'
      );
    });
  });
  describe('User: with Permissions', () => {
    let token;
    let usr;

    before(async () => {
      usr = await factory.create('User');
      await usr.addPermissions([
        'disc.list',
        'disc.read',
        'disc.create',
        'disc.update',
        'disc.destroy',
      ]);
      token = await usr.token();
    });

    it('should not list other users', async () => {
      const otherUser = await factory.create('User');
      await factory.create('Disc', {
        userId: otherUser.id,
      });
      const res = await query(LIST, undefined, token);

      expect(res.body.data.discs.length).to.equal(0);
      expect(res.body.errors).to.be.undefined;
    });
    it('should list my own', async () => {
      const record = await factory.create('Disc', {
        userId: usr.id,
        speed: 14,
      });
      const res = await query(LIST, undefined, token);

      expect(res.body.data.discs).to.exist;
      expect(res.body.data.discs.length).to.equal(1);
      expect(res.body.data.discs[0].id).to.equal(record.id);
      expect(res.body.errors).to.be.undefined;
    });
    it('should list my own with ordering', async () => {
      const LIST_ORDER = `
        query list {
          discs (order: "speed") {
            id
            speed
          }
        }
      `;

      await factory.create('Disc', {
        userId: usr.id,
        speed: 6,
      });
      await factory.create('Disc', {
        userId: usr.id,
        speed: 9,
      });
      const disc3 = await factory.create('Disc', {
        userId: usr.id,
        speed: 1,
      });

      const res = await query(LIST_ORDER, undefined, token);

      expect(res.body.data.discs).to.exist;
      expect(res.body.data.discs.length).to.equal(4);
      expect(res.body.data.discs[0].id).to.equal(disc3.id);
      expect(res.body.errors).to.be.undefined;
    });
    it('should NOT read', async () => {
      const res = await query(READ, { id: record.id }, token);

      expect(res.body.data.disc).to.equal(null);
      expect(res.body.errors).to.be.undefined;
    });
    it('should read my own', async () => {
      const record = await factory.create('Disc', {
        userId: usr.id,
      });
      const res = await query(READ, { id: record.id }, token);

      expect(res.body.data.disc).to.exist;
      expect(res.body.data.disc.id).to.equal(record.id);
      expect(res.body.data.disc.user.id).to.exist;
      expect(res.body.errors).to.be.undefined;
    });
    it('should NOT create', async () => {
      const otherUser = await factory.create('User');
      const attrs = await factory.attrs('Disc');
      const variables = {
        disc: {
          ...attrs,
          userId: otherUser.id,
        },
      };
      const res = await mutate(CREATE, variables, token);

      expect(res.body.data.createDisc).to.be.null;
      expect(res.body.errors[0].message).to.equal(
        'You are not the current user.'
      );
    });
    it('should create my own', async () => {
      const attrs = await factory.attrs('Disc');
      const variables = {
        disc: {
          ...attrs,
          userId: usr.id,
        },
      };

      const res = await mutate(CREATE, variables, token);

      expect(res.body.data.createDisc).to.exist;
      expect(res.body.errors).to.be.undefined;

      const found = await db.Disc.findByPk(res.body.data.createDisc.id);
      expect(found).to.exist;
    });
    it('should NOT update', async () => {
      const otherUser = await factory.create('User');
      const variables = {
        disc: {
          id: record.id,
          brand: 'new brand',
          userId: otherUser.id,
        },
      };
      const res = await mutate(UPDATE, variables, token);

      expect(res.body.data.updateDisc).to.be.null;
      expect(res.body.errors[0].message).to.equal(
        'You can not modify this entry.'
      );
    });
    it('should update my own', async () => {
      const record = await factory.create('Disc', {
        userId: usr.id,
      });
      const variables = {
        disc: {
          id: record.id,
          brand: 'new brand',
        },
      };
      const res = await mutate(UPDATE, variables, token);

      expect(res.body.data.updateDisc).to.exist;
      expect(res.body.data.updateDisc.brand).to.equal('new brand');
      expect(res.body.errors).to.be.undefined;
    });
    it('should NOT destroy', async () => {
      const destroy = await factory.create('Disc');

      const variables = {
        disc: {
          id: destroy.id,
        },
      };

      const res = await mutate(DESTROY, variables, token);

      expect(res.body.data.destroyDisc).to.be.null;
      expect(res.body.errors[0].message).to.equal(
        'You can not destroy this entry.'
      );
    });
    it('should destroy my own', async () => {
      const destroy = await factory.create('Disc', {
        userId: usr.id,
      });

      const variables = {
        disc: {
          id: destroy.id,
        },
      };

      const res = await mutate(DESTROY, variables, token);

      expect(res.body.data.destroyDisc).to.exist;
      expect(res.body.errors).to.be.undefined;

      const found = await db.Disc.findByPk(res.body.data.destroyDisc.id);
      expect(found).to.be.null;
    });
    it('should not add another users disc', async () => {
      const otherUser = await factory.create('User');
      const disc = await factory.create('Disc', {
        userId: otherUser.id,
      });

      const bag = await factory.create('Bag', {
        userId: otherUser.id,
      });

      const QUERY = `
      mutation addDiscToBag($discId: Int!, $bagId: Int!) {
        addDiscToBag(discId: $discId, bagId: $bagId) {
          id
        }
      }`;

      const variables = {
        discId: disc.id,
        bagId: bag.id,
      };

      const res = await mutate(QUERY, variables, token);
      expect(res.body.data.addDiscToBag).to.be.null;
      expect(res.body.errors[0].message).to.equal(
        'You are not the current user.'
      );
    });
    it('should add a disc to a bag', async () => {
      const disc = await factory.create('Disc', {
        userId: usr.id,
      });

      const bag = await factory.create('Bag', {
        userId: usr.id,
      });

      const QUERY = `
      mutation addDiscToBag($discId: Int!, $bagId: Int!) {
        addDiscToBag(discId: $discId, bagId: $bagId) {
          id
        }
      }`;

      const variables = {
        discId: disc.id,
        bagId: bag.id,
      };

      const res = await mutate(QUERY, variables, token);
      expect(res.body.data.addDiscToBag.id).to.equal(disc.id);

      const discs = (await bag.getDiscs()).map((item) => item.id);
      expect(discs).to.include.members([disc.id]);
    });
  });
});
