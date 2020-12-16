import { factory } from '../utils/factory';

describe('Model - DiscBag', () => {
  it('should create a discbag', async() => {
    await factory.create('DiscBag').should.be.fulfilled;
  });

  describe('Validations', () => {
    it('should require a valid discId', async () => {
      const disc = await factory.create('Disc');
      await factory.create('DiscBag', { discId: null }).should.be.rejectedWith(/notNull/);
      await factory.create('DiscBag', { discId: false }).should.be.rejectedWith(/number/);
      await factory.create('DiscBag', { discId: true }).should.be.rejectedWith(/number/);
      await factory.create('DiscBag', { discId: '163' }).should.be.rejectedWith(/number/);
      await factory.create('DiscBag', { discId: { foo: 'bar' } }).should.be.rejectedWith(/number/);
      await factory.create('DiscBag', { discId: disc.id }).should.be.fulfilled;
    });

    it('should require a valid bagId', async () => {
      const bag = await factory.create('Bag');
      await factory.create('DiscBag', { bagId: null }).should.be.rejectedWith(/notNull/);
      await factory.create('DiscBag', { bagId: false }).should.be.rejectedWith(/number/);
      await factory.create('DiscBag', { bagId: true }).should.be.rejectedWith(/number/);
      await factory.create('DiscBag', { bagId: '163' }).should.be.rejectedWith(/number/);
      await factory.create('DiscBag', { bagId: { foo: 'bar' } }).should.be.rejectedWith(/number/);
      await factory.create('DiscBag', { bagId: bag.id }).should.be.fulfilled;
    });
  });
});
