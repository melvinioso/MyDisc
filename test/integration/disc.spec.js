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
        disc: attrs
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
        }
      }
      const res = await mutate(UPDATE, variables);

      expect(res.body.data.updateDisc).to.be.null;
      expect(res.body.errors).to.exist;
      expect(res.body.errors[0].message).to.equal('Not authorized.');
    });
    it('should NOT destroy', async () => {
      const variables = {
        disc: {
          id: record.id,
        }
      }
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
      expect(res.body.errors[0].message).to.equal('Missing permission for disc.list');
    });
    it('should NOT read', async () => {
      const res = await query(READ, { id: record.id }, token);

      expect(res.body.data.disc).to.be.null;
      expect(res.body.errors).to.exist;
      expect(res.body.errors[0].message).to.equal('Missing permission for disc.read');
    });
    it('should NOT create', async () => {
      const attrs = await factory.attrs('Disc');
      const variables = {
        disc: attrs
      };

      const res = await mutate(CREATE, variables, token);

      expect(res.body.data.createDisc).to.be.null;
      expect(res.body.errors).to.exist;
      expect(res.body.errors[0].message).to.equal('Missing permission for disc.create');
    });
    it('should NOT update', async () => {
      const variables = {
        disc: {
          id: record.id,
          brand: 'new brand',
        }
      }
      const res = await mutate(UPDATE, variables, token);

      expect(res.body.data.updateDisc).to.be.null;
      expect(res.body.errors).to.exist;
      expect(res.body.errors[0].message).to.equal('Missing permission for disc.update');
    });
    it('should NOT destroy', async () => {
      const variables = {
        disc: {
          id: record.id,
        }
      }
      const res = await mutate(DESTROY, variables, token);

      expect(res.body.data.destroyDisc).to.be.null;
      expect(res.body.errors).to.exist;
      expect(res.body.errors[0].message).to.equal('Missing permission for disc.destroy');
    });
  });
  describe('User: with Permissions', () => {
    let token;

    before(async () => {
      const usr = await factory.create('User');
      await usr.addPermissions([
        'disc.list',
        'disc.read',
        'disc.create',
        'disc.update',
        'disc.destroy',
      ]);
      token = await usr.token();
    });

    it('should list', async () => {
      const res = await query(LIST, undefined, token);

      expect(res.body.data.discs).to.exist;
      expect(res.body.data.discs.length).to.exist;
      expect(res.body.errors).to.be.undefined;
    });
    it('should read', async () => {
      const res = await query(READ, { id: record.id }, token);

      expect(res.body.data.disc).to.exist;
      expect(res.body.data.disc.id).to.equal(record.id);
      // expect(res.body.data.disc.user.id).to.exist;
      expect(res.body.errors).to.be.undefined;
    });
    it('should create', async () => {
      const attrs = await factory.attrs('Disc');
      const variables = {
        disc: attrs
      }
      const res = await mutate(CREATE, variables, token);

      expect(res.body.data.createDisc).to.exist;
      expect(res.body.errors).to.be.undefined;

      const found = await db.Disc.findByPk(res.body.data.createDisc.id);
      expect(found).to.exist;
    });
    it('should update', async () => {
      const variables = {
        disc: {
          id: record.id,
          brand: 'new brand',
        }
      }
      const res = await mutate(UPDATE, variables, token);

      expect(res.body.data.updateDisc).to.exist;
      expect(res.body.data.updateDisc.brand).to.equal('new brand');
      expect(res.body.errors).to.be.undefined;
    });
    it('should destroy', async () => {
      const destroy = await factory.create('Disc');

      const variables = {
        disc: {
          id: destroy.id,
        }
      }

      const res = await mutate(DESTROY, variables, token);

      expect(res.body.data.destroyDisc).to.exist;
      expect(res.body.errors).to.be.undefined;

      const found = await db.Disc.findByPk(res.body.data.destroyDisc.id);
      expect(found).to.be.null;
    });
  });
});