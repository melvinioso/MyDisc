import { factory } from '../utils/factory';
const chai = require('chai');
const expect = chai.expect;
const should = require('chai').should();
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

describe('Model - User', () => {
  it('should create a user', async() => {
    await factory.create('User', {
      provider: 'gmail',
      providerId: 'test@example.com',
      providerKey: 'some-api-key',
    }).should.be.fulfilled;
  });

  describe('Validations', () => {
    it('should require a valid provider', async () => {
      await factory.create('User', { provider: null }).should.be.rejectedWith(/notNull/);
      await factory.create('User', { provider: false }).should.be.rejectedWith(/string/);
      await factory.create('User', { provider: true }).should.be.rejectedWith(/string/);
      await factory.create('User', { provider: 123 }).should.be.rejectedWith(/string/);
      await factory.create('User', { provider: { foo: 'bar' } }).should.be.rejectedWith(/string/);
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
});
