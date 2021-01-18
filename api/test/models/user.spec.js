import { expect } from 'chai';
import { factory } from '../utils/factory';

describe('Model - User', () => {
  it('should create a user', async() => {
    await factory.create('User').should.be.fulfilled;
  });

  describe('Validations', () => {
    it('should require a valid provider', async () => {
      await factory.create('User', { provider: null }).should.be.rejectedWith(/notNull/);
      await factory.create('User', { provider: false }).should.be.rejectedWith(/provider/);
      await factory.create('User', { provider: true }).should.be.rejectedWith(/provider/);
      await factory.create('User', { provider: 123 }).should.be.rejectedWith(/provider/);
      await factory.create('User', { provider: { foo: 'bar' } }).should.be.rejectedWith(/provider/);
    });

    it('should require a valid providerId', async () => {
      await factory.create('User', { providerId: null }).should.be.rejectedWith(/notNull/);
      await factory.create('User', { providerId: false }).should.be.rejectedWith(/string/);
      await factory.create('User', { providerId: true }).should.be.rejectedWith(/string/);
      await factory.create('User', { providerId: 123 }).should.be.rejectedWith(/string/);
      await factory.create('User', { providerId: { foo: 'bar' } }).should.be.rejectedWith(/string/);
    });

    it('should require a valid providerKey', async () => {
      await factory.create('User', { providerKey: null }).should.be.rejectedWith(/notNull/);
      await factory.create('User', { providerKey: false }).should.be.rejectedWith(/string/);
      await factory.create('User', { providerKey: true }).should.be.rejectedWith(/string/);
      await factory.create('User', { providerKey: 123 }).should.be.rejectedWith(/string/);
      await factory.create('User', { providerKey: { foo: 'bar' } }).should.be.rejectedWith(/string/);
    });
  });

  describe('Relationships', () => {
    let user;

    beforeEach(async () => {
      user = await factory.create('User');
    });

    it('hasMany Permission', async () => {
      const record = await factory.create('Permission', {
        userId: user.id,
      });

      const found = await user.getPermissions();
      expect(found.length).to.equal(1);
      expect(found[0].userId).to.equal(user.id);
    });

    it('hasMany Bag', async () => {
      const record = await factory.create('Bag', {
        userId: user.id,
      });
      
      const found = await user.getBags();
      expect(found.length).to.equal(1);
      expect(found[0].id).to.equal(record.id);
    });

    it('hasMany Disc', async () => {
      const record = await factory.create('Disc', {
        userId: user.id,
      });
      
      const found = await user.getDiscs();
      expect(found.length).to.equal(1);
      expect(found[0].id).to.equal(record.id);
    });

    it('hasOne Profile', async () => {
      const user = await factory.create('User');
      const record = await factory.create('Profile');

      await user.setProfile(record);

      const found = await user.getProfile();
      expect(found.id).to.equal(record.id);
    });

    it('hasMany Email', async () => {
      const record = await factory.create('Email', {
        userId: user.id,
      });
      
      const found = await user.getEmails();
      expect(found.length).to.equal(1);
      expect(found[0].id).to.equal(record.id);
    });
  });
});
