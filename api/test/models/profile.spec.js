import { factory } from '../utils/factory';

describe('Model - Profile', () => {
  it('should create a profile', async() => {
    const user = await factory.create('User');
    await factory.create('Profile', { userId: user.id }).should.be.fulfilled;
  });

  describe('Validations', () => {
    it('should require a valid userId', async () => {
      await factory.create('Profile', { userId: null }).should.be.rejectedWith(/notNull/);
      await factory.create('Profile', { userId: false }).should.be.rejectedWith(/number/);
      await factory.create('Profile', { userId: true }).should.be.rejectedWith(/number/);
      await factory.create('Profile', { userId: '163' }).should.be.rejectedWith(/number/);
      await factory.create('Profile', { userId: { foo: 'bar' } }).should.be.rejectedWith(/number/);
    });

    it('should reject invalid name', async () => {
      await factory.create('Profile', { name: false }).should.be.rejectedWith(/string/);
      await factory.create('Profile', { name: true }).should.be.rejectedWith(/string/);
      await factory.create('Profile', { name: 123 }).should.be.rejectedWith(/string/);
      await factory.create('Profile', { name: { foo: 'bar' } }).should.be.rejectedWith(/string/);
    });
  });

  describe('Relationships', () => {
    it('belongsTo User', async () => {
      const user = await factory.create('User');
      const record = await factory.create('Profile');

      await record.setUser(user);

      const found = await record.getUser();
      expect(found.id).to.equal(user.id);
    });
  });
});
