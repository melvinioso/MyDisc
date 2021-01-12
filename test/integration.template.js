import { factory, db, query, mutate } from '../utils';

const LIST = `
  query list {
    [LOWERNAME]s {
      id
    }
  }
`;

const READ = `
  query read($id: Int!) {
    [LOWERNAME](id: $id) {
      id
    }
  }
`;

const CREATE = `
  mutation create($[LOWERNAME]: [UPPERNAME]Create) {
    create[UPPERNAME]([LOWERNAME]: $[LOWERNAME]) {
      id
    }
  }
`;

const UPDATE = `
  mutation update($[LOWERNAME]: [UPPERNAME]Update) {
    update[UPPERNAME]([LOWERNAME]: $[LOWERNAME]) {
      id
      brand
    }
  }
`;

const DESTROY = `
  mutation destroy($[LOWERNAME]: [UPPERNAME]Destroy) {
    destroy[UPPERNAME]([LOWERNAME]: $[LOWERNAME]) {
      id
    }
  }
`;

describe('Integration - [UPPERNAME]', () => {
  let record;

  before(async () => {
    record = await factory.create('[UPPERNAME]');
    await factory.create('[UPPERNAME]');
    await factory.create('[UPPERNAME]');
  });

  describe('Anonymous', () => {
    it('should NOT list', async () => {
      const res = await query(LIST);

      expect(res.body.data.[LOWERNAME]s).to.be.null;
      expect(res.body.errors).to.exist;
      expect(res.body.errors[0].message).to.equal('Not authorized.');
    });
    it('should NOT read', async () => {
      const res = await query(READ, { id: record.id });

      expect(res.body.data.[LOWERNAME]).to.be.null;
      expect(res.body.errors).to.exist;
      expect(res.body.errors[0].message).to.equal('Not authorized.');
    });
    it('should NOT create', async () => {
      const attrs = await factory.attrs('[UPPERNAME]');
      const variables = {
        [LOWERNAME]: attrs
      };

      const res = await mutate(CREATE, variables);

      expect(res.body.data.create[UPPERNAME]).to.be.null;
      expect(res.body.errors).to.exist;
      expect(res.body.errors[0].message).to.equal('Not authorized.');
    });
    it('should NOT update', async () => {
      const variables = {
        [LOWERNAME]: {
          id: record.id,
          attribute: 'new value',
        }
      }
      const res = await mutate(UPDATE, variables);

      expect(res.body.data.update[UPPERNAME]).to.be.null;
      expect(res.body.errors).to.exist;
      expect(res.body.errors[0].message).to.equal('Not authorized.');
    });
    it('should NOT destroy', async () => {
      const variables = {
        [LOWERNAME]: {
          id: record.id,
        }
      }
      const res = await mutate(DESTROY, variables);

      expect(res.body.data.destroy[UPPERNAME]).to.be.null;
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

      expect(res.body.data.[LOWERNAME]s).to.be.null;
      expect(res.body.errors).to.exist;
      expect(res.body.errors[0].message).to.equal('Missing permission for [LOWERNAME].list');
    });
    it('should NOT read', async () => {
      const res = await query(READ, { id: record.id }, token);

      expect(res.body.data.[LOWERNAME]).to.be.null;
      expect(res.body.errors).to.exist;
      expect(res.body.errors[0].message).to.equal('Missing permission for [LOWERNAME].read');
    });
    it('should NOT create', async () => {
      const attrs = await factory.attrs('[UPPERNAME]');
      const variables = {
        [LOWERNAME]: attrs
      };

      const res = await mutate(CREATE, variables, token);

      expect(res.body.data.create[UPPERNAME]).to.be.null;
      expect(res.body.errors).to.exist;
      expect(res.body.errors[0].message).to.equal('Missing permission for [LOWERNAME].create');
    });
    it('should NOT update', async () => {
      const variables = {
        [LOWERNAME]: {
          id: record.id,
          attribute: 'new value',
        }
      }
      const res = await mutate(UPDATE, variables, token);

      expect(res.body.data.update[UPPERNAME]).to.be.null;
      expect(res.body.errors).to.exist;
      expect(res.body.errors[0].message).to.equal('Missing permission for [LOWERNAME].update');
    });
    it('should NOT destroy', async () => {
      const variables = {
        [LOWERNAME]: {
          id: record.id,
        }
      }
      const res = await mutate(DESTROY, variables, token);

      expect(res.body.data.destroy[UPPERNAME]).to.be.null;
      expect(res.body.errors).to.exist;
      expect(res.body.errors[0].message).to.equal('Missing permission for [LOWERNAME].destroy');
    });
  });
  describe('User: with Permissions', () => {
    let token;

    before(async () => {
      const usr = await factory.create('User');
      await usr.addPermissions([
        '[LOWERNAME].list',
        '[LOWERNAME].read',
        '[LOWERNAME].create',
        '[LOWERNAME].update',
        '[LOWERNAME].destroy',
      ]);
      token = await usr.token();
    });

    it('should list', async () => {
      const res = await query(LIST, undefined, token);

      expect(res.body.data.[LOWERNAME]s).to.exist;
      expect(res.body.data.[LOWERNAME]s.length).to.exist;
      expect(res.body.errors).to.be.undefined;
    });
    it('should read', async () => {
      const res = await query(READ, { id: record.id }, token);

      expect(res.body.data.[LOWERNAME]).to.exist;
      expect(res.body.data.[LOWERNAME].id).to.equal(record.id);
      // expect(res.body.data.[LOWERNAME].user.id).to.exist;
      expect(res.body.errors).to.be.undefined;
    });
    it('should create', async () => {
      const attrs = await factory.attrs('[UPPERNAME]');
      const variables = {
        [LOWERNAME]: attrs
      }
      const res = await mutate(CREATE, variables, token);

      expect(res.body.data.create[UPPERNAME]).to.exist;
      expect(res.body.errors).to.be.undefined;

      const found = await db.[UPPERNAME].findByPk(res.body.data.create[UPPERNAME].id);
      expect(found).to.exist;
    });
    it('should update', async () => {
      const variables = {
        [LOWERNAME]: {
          id: record.id,
          attribute: 'new value',
        }
      }
      const res = await mutate(UPDATE, variables, token);

      expect(res.body.data.update[UPPERNAME]).to.exist;
      expect(res.body.data.update[UPPERNAME].brand).to.equal('new value');
      expect(res.body.errors).to.be.undefined;
    });
    it('should destroy', async () => {
      const destroy = await factory.create('[UPPERNAME]');

      const variables = {
        [LOWERNAME]: {
          id: destroy.id,
        }
      }

      const res = await mutate(DESTROY, variables, token);

      expect(res.body.data.destroy[UPPERNAME]).to.exist;
      expect(res.body.errors).to.be.undefined;

      const found = await db.[UPPERNAME].findByPk(res.body.data.destroy[UPPERNAME].id);
      expect(found).to.be.null;
    });
  });
});