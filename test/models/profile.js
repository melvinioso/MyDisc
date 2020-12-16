import { factory } from '../utils/factory';
const chai = require('chai');
const expect = chai.expect;
const should = require('chai').should();
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

describe('Model - Profile', () => {
  it('should create a profile', async() => {
    const user = await factory.create('User');
    await factory.create('Profile', {
      userId: user.id,
      name: 'Melvini Oso',
    }).should.be.fulfilled;
  });

  describe('Validations', () => {
    it('should require a valid userId', async () => {
      const user = await factory.create('User');
      await factory.create('Profile', { userId: null }).should.be.rejectedWith(/notNull/);
      await factory.create('Profile', { userId: false }).should.be.rejectedWith(/number/);
      await factory.create('Profile', { userId: true }).should.be.rejectedWith(/number/);
      await factory.create('Profile', { userId: '163' }).should.be.rejectedWith(/number/);
      await factory.create('Profile', { userId: { foo: 'bar' } }).should.be.rejectedWith(/number/);
      await factory.create('Profile', { userId: user.id }).should.be.fulfilled;
    });

    it('should require a valid name', async () => {
      await factory.create('Profile', { name: null }).should.be.rejectedWith(/notNull/);
      await factory.create('Profile', { name: false }).should.be.rejectedWith(/string/);
      await factory.create('Profile', { name: true }).should.be.rejectedWith(/string/);
      await factory.create('Profile', { name: 123 }).should.be.rejectedWith(/string/);
      await factory.create('Profile', { name: { foo: 'bar' } }).should.be.rejectedWith(/string/);
    });
  });
});