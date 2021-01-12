import { factory, db, query, mutate } from '../utils';

const LIST = `
  query list {
    emails {
      id
    }
  }
`;

const READ = `
  query read($id: Int!) {
    email(id: $id) {
      id
    }
  }
`;

const CREATE = `
  mutation create($email: EmailCreate) {
    createEmail(email: $email) {
      id
    }
  }
`;

const UPDATE = `
  mutation update($email: EmailUpdate) {
    updateEmail(email: $email) {
      id
      email
    }
  }
`;

const DESTROY = `
  mutation destroy($email: EmailDestroy) {
    destroyEmail(email: $email) {
      id
    }
  }
`;

describe('Integration - Email', () => {
  let record;

  before(async () => {
    record = await factory.create('Email');
    await factory.create('Email');
    await factory.create('Email');
  });

  describe('Anonymous', () => {
    it('should NOT list', async () => {
      const res = await query(LIST);

      expect(res.body.data.emails).to.be.null;
      expect(res.body.errors).to.exist;
      expect(res.body.errors[0].message).to.equal('Not authorized.');
    });
    it('should NOT read', async () => {
      const res = await query(READ, { id: record.id });

      expect(res.body.data.email).to.be.null;
      expect(res.body.errors).to.exist;
      expect(res.body.errors[0].message).to.equal('Not authorized.');
    });
    it('should NOT create', async () => {
      const attrs = await factory.attrs('Email');
      const variables = {
        email: attrs
      };

      const res = await mutate(CREATE, variables);

      expect(res.body.data.createEmail).to.be.null;
      expect(res.body.errors).to.exist;
      expect(res.body.errors[0].message).to.equal('Not authorized.');
    });
    it('should NOT update', async () => {
      const variables = {
        email: {
          id: record.id,
          email: 'new_email@example.com',
        }
      }
      const res = await mutate(UPDATE, variables);

      expect(res.body.data.updateEmail).to.be.null;
      expect(res.body.errors).to.exist;
      expect(res.body.errors[0].message).to.equal('Not authorized.');
    });
    it('should NOT destroy', async () => {
      const variables = {
        email: {
          id: record.id,
        }
      }
      const res = await mutate(DESTROY, variables);

      expect(res.body.data.destroyEmail).to.be.null;
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

      expect(res.body.data.emails).to.be.null;
      expect(res.body.errors).to.exist;
      expect(res.body.errors[0].message).to.equal('Missing permission for email.list');
    });
    it('should NOT read', async () => {
      const res = await query(READ, { id: record.id }, token);

      expect(res.body.data.email).to.be.null;
      expect(res.body.errors).to.exist;
      expect(res.body.errors[0].message).to.equal('Missing permission for email.read');
    });
    it('should NOT create', async () => {
      const attrs = await factory.attrs('Email');
      const variables = {
        email: attrs
      };

      const res = await mutate(CREATE, variables, token);

      expect(res.body.data.createEmail).to.be.null;
      expect(res.body.errors).to.exist;
      expect(res.body.errors[0].message).to.equal('Missing permission for email.create');
    });
    it('should NOT update', async () => {
      const variables = {
        email: {
          id: record.id,
          email: 'new_email@example.com',
        }
      }
      const res = await mutate(UPDATE, variables, token);

      expect(res.body.data.updateEmail).to.be.null;
      expect(res.body.errors).to.exist;
      expect(res.body.errors[0].message).to.equal('Missing permission for email.update');
    });
    it('should NOT destroy', async () => {
      const variables = {
        email: {
          id: record.id,
        }
      }
      const res = await mutate(DESTROY, variables, token);

      expect(res.body.data.destroyEmail).to.be.null;
      expect(res.body.errors).to.exist;
      expect(res.body.errors[0].message).to.equal('Missing permission for email.destroy');
    });
  });
  describe('User: with Permissions', () => {
    let token;

    before(async () => {
      const usr = await factory.create('User');
      await usr.addPermissions([
        'email.list',
        'email.read',
        'email.create',
        'email.update',
        'email.destroy',
      ]);
      token = await usr.token();
    });

    it('should list', async () => {
      const res = await query(LIST, undefined, token);

      expect(res.body.data.emails).to.exist;
      expect(res.body.data.emails.length).to.exist;
      expect(res.body.errors).to.be.undefined;
    });
    it('should read', async () => {
      const res = await query(READ, { id: record.id }, token);

      expect(res.body.data.email).to.exist;
      expect(res.body.data.email.id).to.equal(record.id);
      // expect(res.body.data.email.user.id).to.exist;
      expect(res.body.errors).to.be.undefined;
    });
    it('should create', async () => {
      const attrs = await factory.attrs('Email');
      const variables = {
        email: attrs
      }
      const res = await mutate(CREATE, variables, token);

      expect(res.body.data.createEmail).to.exist;
      expect(res.body.errors).to.be.undefined;

      const found = await db.Email.findByPk(res.body.data.createEmail.id);
      expect(found).to.exist;
    });
    it('should update', async () => {
      const variables = {
        email: {
          id: record.id,
          email: 'new_email@example.com',
        }
      }
      const res = await mutate(UPDATE, variables, token);

      expect(res.body.data.updateEmail).to.exist;
      expect(res.body.data.updateEmail.email).to.equal('new_email@example.com');
      expect(res.body.errors).to.be.undefined;
    });
    it('should destroy', async () => {
      const destroy = await factory.create('Email');

      const variables = {
        email: {
          id: destroy.id,
        }
      }

      const res = await mutate(DESTROY, variables, token);

      expect(res.body.data.destroyEmail).to.exist;
      expect(res.body.errors).to.be.undefined;

      const found = await db.Email.findByPk(res.body.data.destroyEmail.id);
      expect(found).to.be.null;
    });
  });
});