import { factory, db, query, mutate } from '../utils';

const LIST = `
  query list {
    profiles {
      id
    }
  }
`;

const READ = `
  query read($id: Int!) {
    profile(id: $id) {
      id
      user {
        id
      }
    }
  }
`;

const CREATE = `
  mutation create($profile: ProfileCreate) {
    createProfile(profile: $profile) {
      id
    }
  }
`;

const UPDATE = `
  mutation update($profile: ProfileUpdate) {
    updateProfile(profile: $profile) {
      id
      name
    }
  }
`;

const DESTROY = `
  mutation destroy($profile: ProfileDestroy) {
    destroyProfile(profile: $profile) {
      id
    }
  }
`;

describe('Integration - Profile', () => {
  let record;

  before(async () => {
    record = await factory.create('Profile');
    await factory.create('Profile');
    await factory.create('Profile');
  });

  describe('Anonymous', () => {
    it('should NOT list', async () => {
      const res = await query(LIST);

      expect(res.body.data.profiles).to.be.null;
      expect(res.body.errors).to.exist;
      expect(res.body.errors[0].message).to.equal('Not authorized.');
    });
    it('should NOT read', async () => {
      const res = await query(READ, { id: record.id });

      expect(res.body.data.profile).to.be.null;
      expect(res.body.errors).to.exist;
      expect(res.body.errors[0].message).to.equal('Not authorized.');
    });
    it('should NOT create', async () => {
      const attrs = await factory.attrs('Profile');
      const variables = {
        profile: attrs
      };

      const res = await mutate(CREATE, variables);

      expect(res.body.data.createProfile).to.be.null;
      expect(res.body.errors).to.exist;
      expect(res.body.errors[0].message).to.equal('Not authorized.');
    });
    it('should NOT update', async () => {
      const variables = {
        profile: {
          id: record.id,
          name: 'new name',
        }
      }
      const res = await mutate(UPDATE, variables);

      expect(res.body.data.updateProfile).to.be.null;
      expect(res.body.errors).to.exist;
      expect(res.body.errors[0].message).to.equal('Not authorized.');
    });
    it('should NOT destroy', async () => {
      const variables = {
        profile: {
          id: record.id,
        }
      }
      const res = await mutate(DESTROY, variables);

      expect(res.body.data.destroyProfile).to.be.null;
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

      expect(res.body.data.profiles).to.be.null;
      expect(res.body.errors).to.exist;
      expect(res.body.errors[0].message).to.equal('Missing permission for profile.list');
    });
    it('should NOT read', async () => {
      const res = await query(READ, { id: record.id }, token);

      expect(res.body.data.profile).to.be.null;
      expect(res.body.errors).to.exist;
      expect(res.body.errors[0].message).to.equal('Missing permission for profile.read');
    });
    it('should NOT create', async () => {
      const attrs = await factory.attrs('Profile');
      const variables = {
        profile: attrs
      };

      const res = await mutate(CREATE, variables, token);

      expect(res.body.data.createProfile).to.be.null;
      expect(res.body.errors).to.exist;
      expect(res.body.errors[0].message).to.equal('Missing permission for profile.create');
    });
    it('should NOT update', async () => {
      const variables = {
        profile: {
          id: record.id,
          name: 'new name',
        }
      }
      const res = await mutate(UPDATE, variables, token);

      expect(res.body.data.updateProfile).to.be.null;
      expect(res.body.errors).to.exist;
      expect(res.body.errors[0].message).to.equal('Missing permission for profile.update');
    });
    it('should NOT destroy', async () => {
      const variables = {
        profile: {
          id: record.id,
        }
      }
      const res = await mutate(DESTROY, variables, token);

      expect(res.body.data.destroyProfile).to.be.null;
      expect(res.body.errors).to.exist;
      expect(res.body.errors[0].message).to.equal('Missing permission for profile.destroy');
    });
  });
  describe('User: with Permissions', () => {
    let token;

    before(async () => {
      const usr = await factory.create('User');
      await usr.addPermissions([
        'profile.list',
        'profile.read',
        'profile.create',
        'profile.update',
        'profile.destroy',
      ]);
      token = await usr.token();
    });

    it('should list', async () => {
      const res = await query(LIST, undefined, token);

      expect(res.body.data.profiles).to.exist;
      expect(res.body.data.profiles.length).to.exist;
      expect(res.body.errors).to.be.undefined;
    });
    it('should read', async () => {
      const res = await query(READ, { id: record.id }, token);

      expect(res.body.data.profile).to.exist;
      expect(res.body.data.profile.id).to.equal(record.id);
      expect(res.body.data.profile.user.id).to.exist;
      expect(res.body.errors).to.be.undefined;
    });
    it('should create', async () => {
      const attrs = await factory.attrs('Profile');
      const variables = {
        profile: attrs
      }
      const res = await mutate(CREATE, variables, token);

      expect(res.body.data.createProfile).to.exist;
      expect(res.body.errors).to.be.undefined;

      const found = await db.Profile.findByPk(res.body.data.createProfile.id);
      expect(found).to.exist;
    });
    it('should update', async () => {
      const variables = {
        profile: {
          id: record.id,
          name: 'new name',
        }
      }
      const res = await mutate(UPDATE, variables, token);

      expect(res.body.data.updateProfile).to.exist;
      expect(res.body.data.updateProfile.name).to.equal('new name');
      expect(res.body.errors).to.be.undefined;
    });
    it('should destroy', async () => {
      const destroy = await factory.create('Profile');

      const variables = {
        profile: {
          id: destroy.id,
        }
      }

      const res = await mutate(DESTROY, variables, token);

      expect(res.body.data.destroyProfile).to.exist;
      expect(res.body.errors).to.be.undefined;

      const found = await db.Profile.findByPk(res.body.data.destroyProfile.id);
      expect(found).to.be.null;
    });
  });
});