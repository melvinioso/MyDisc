import { factory } from '../utils/factory';

describe('Model - Permission', () => {
  it('should create a permission', async() => {
    const record = await factory.create('Permission', { key: 'user.list' });
    expect(record.key).to.equal('user.list');
  });

  describe('Validations', () => {
    it('should require a valid userId', async () => {
      await factory.create('Permission', { userId: null }).should.be.rejectedWith(/notNull/);
      await factory.create('Permission', { userId: false }).should.be.rejectedWith(/number/);
      await factory.create('Permission', { userId: true }).should.be.rejectedWith(/number/);
      await factory.create('Permission', { userId: '163' }).should.be.rejectedWith(/number/);
      await factory.create('Permission', { userId: { foo: 'bar' } }).should.be.rejectedWith(/number/);
    });

    it('should require a valid key', async () => {
      await factory.create('Permission', { key: false }).should.be.rejectedWith(/key/);
      await factory.create('Permission', { key: true }).should.be.rejectedWith(/key/);
      await factory.create('Permission', { key: 123 }).should.be.rejectedWith(/key/);
      await factory.create('Permission', { key: { foo: 'bar' } }).should.be.rejectedWith(/key/);
    });
  });

  describe('Relationships', () => {
    it('belongsTo User', async () => {
      const user = await factory.create('User');
      const record = await factory.create('Permission');

      await record.setUser(user);

      const found = await record.getUser();
      expect(found.id).to.equal(user.id);
    });
  });
});
