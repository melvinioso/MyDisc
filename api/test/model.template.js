import { factory } from '../utils/factory';

describe('Model - [NAME]', () => {
  it('should create a model', async() => {
    await factory.create('[NAME]', {
      attribute: value,
    }).should.be.fulfilled;
  });

  describe('Validations', () => {
    it('should require a valid attributeA', async () => {
      await factory.create('[NAME]', { attributeA: null }).should.be.rejectedWith(/notNull/);
      await factory.create('[NAME]', { attributeA: false }).should.be.rejectedWith(/number/);
      await factory.create('[NAME]', { attributeA: true }).should.be.rejectedWith(/number/);
      await factory.create('[NAME]', { attributeA: '123' }).should.be.rejectedWith(/number/);
      await factory.create('[NAME]', { attributeA: { foo: 'bar' } }).should.be.rejectedWith(/number/);
    });

    it('should reject invalid attributeB', async () => {
      await factory.create('[NAME]', { attributeB: false }).should.be.rejectedWith(/string/);
      await factory.create('[NAME]', { attributeB: true }).should.be.rejectedWith(/string/);
      await factory.create('[NAME]', { attributeB: 123 }).should.be.rejectedWith(/string/);
      await factory.create('[NAME]', { attributeB: { foo: 'bar' } }).should.be.rejectedWith(/string/);
    });
  });

  describe('Relationships', () => {});
});
