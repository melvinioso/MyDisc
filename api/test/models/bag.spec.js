import { factory } from '../utils/factory';

describe('Model - Bag', () => {
  it('should create a bag', async () => {
    const user = await factory.create('User');
    await factory.create('Bag', { userId: user.id }).should.be.fulfilled;
  });

  describe('Validations', () => {
    it('should require a valid userId', async () => {
      const user = await factory.create('User');
      await factory
        .create('Bag', { userId: null })
        .should.be.rejectedWith(/notNull/);
      await factory
        .create('Bag', { userId: false })
        .should.be.rejectedWith(/number/);
      await factory
        .create('Bag', { userId: true })
        .should.be.rejectedWith(/number/);
      await factory
        .create('Bag', { userId: '163' })
        .should.be.rejectedWith(/number/);
      await factory
        .create('Bag', { userId: { foo: 'bar' } })
        .should.be.rejectedWith(/number/);
      await factory.create('Bag', { userId: user.id }).should.be.fulfilled;
    });

    it('should require a valid name', async () => {
      await factory
        .create('Bag', { name: null })
        .should.be.rejectedWith(/notNull/);
      await factory
        .create('Bag', { name: false })
        .should.be.rejectedWith(/string/);
      await factory
        .create('Bag', { name: true })
        .should.be.rejectedWith(/string/);
      await factory
        .create('Bag', { name: 123 })
        .should.be.rejectedWith(/string/);
      await factory
        .create('Bag', { name: { foo: 'bar' } })
        .should.be.rejectedWith(/string/);
    });

    it('should require a valid capacity', async () => {
      await factory
        .create('Bag', { capacity: null })
        .should.be.rejectedWith(/notNull/);
      await factory
        .create('Bag', { capacity: false })
        .should.be.rejectedWith(/number/);
      await factory
        .create('Bag', { capacity: true })
        .should.be.rejectedWith(/number/);
      await factory
        .create('Bag', { capacity: '163' })
        .should.be.rejectedWith(/number/);
      await factory
        .create('Bag', { capacity: { foo: 'bar' } })
        .should.be.rejectedWith(/number/);
    });

    it('should require a valid color', async () => {
      await factory
        .create('Bag', { color: null })
        .should.be.rejectedWith(/notNull/);
      await factory
        .create('Bag', { color: false })
        .should.be.rejectedWith(/string/);
      await factory
        .create('Bag', { color: true })
        .should.be.rejectedWith(/string/);
      await factory
        .create('Bag', { color: 123 })
        .should.be.rejectedWith(/string/);
      await factory
        .create('Bag', { color: { foo: 'bar' } })
        .should.be.rejectedWith(/string/);
    });
  });

  describe('Relationships', () => {
    it('belongsTo User', async () => {
      const user = await factory.create('User');
      const record = await factory.create('Bag');

      await record.setUser(user);

      const found = await record.getUser();
      expect(found.id).to.equal(user.id);
    });

    it('belongsToMany Disc through DiscBag', async () => {
      const bag = await factory.create('Bag');
      const disc = await factory.create('Disc');

      await bag.addDisc(disc);

      const found = await disc.getBags();
      expect(found.length).to.equal(1);
      expect(found[0].id).to.equal(bag.id);
    });
  });
});
