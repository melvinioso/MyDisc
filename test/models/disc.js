import { factory } from '../utils/factory';
const chai = require('chai');
const expect = chai.expect;
const should = require('chai').should();
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

describe('Model - Disc', () => {
  it('should create a disc', async() => {
    await factory.create('Disc', {
      brand: 'Innova',
      mold: 'Colt',
      plastic: 'DX',
      weight: 163,
      speed: 3,
      glide: 4,
      turn: -1,
      fade: 1,
    }).should.be.fulfilled;
  });

  describe('Validations', () => {
    it('should require a valid brand', async () => {
      await factory.create('Disc', { brand: null }).should.be.rejectedWith(/notNull/);
      await factory.create('Disc', { brand: false }).should.be.rejectedWith(/string/);
      await factory.create('Disc', { brand: true }).should.be.rejectedWith(/string/);
      await factory.create('Disc', { brand: 123 }).should.be.rejectedWith(/string/);
      await factory.create('Disc', { brand: { foo: 'bar' } }).should.be.rejectedWith(/string/);
    });

    it('should require a valid mold', async () => {
      await factory.create('Disc', { mold: null }).should.be.rejectedWith(/notNull/);
      await factory.create('Disc', { mold: false }).should.be.rejectedWith(/string/);
      await factory.create('Disc', { mold: true }).should.be.rejectedWith(/string/);
      await factory.create('Disc', { mold: 123 }).should.be.rejectedWith(/string/);
      await factory.create('Disc', { mold: { foo: 'bar' } }).should.be.rejectedWith(/string/);
    });

    it('should require a valid plastic', async () => {
      await factory.create('Disc', { plastic: null }).should.be.rejectedWith(/notNull/);
      await factory.create('Disc', { plastic: false }).should.be.rejectedWith(/string/);
      await factory.create('Disc', { plastic: true }).should.be.rejectedWith(/string/);
      await factory.create('Disc', { plastic: 123 }).should.be.rejectedWith(/string/);
      await factory.create('Disc', { plastic: { foo: 'bar' } }).should.be.rejectedWith(/string/);
    });

    it('should require a valid weight', async () => {
      await factory.create('Disc', { weight: null }).should.be.rejectedWith(/notNull/);
      await factory.create('Disc', { weight: false }).should.be.rejectedWith(/number/);
      await factory.create('Disc', { weight: true }).should.be.rejectedWith(/number/);
      await factory.create('Disc', { weight: '163' }).should.be.rejectedWith(/number/);
      await factory.create('Disc', { weight: { foo: 'bar' } }).should.be.rejectedWith(/number/);
    });

    it('should require a valid speed', async () => {
      await factory.create('Disc', { speed: null }).should.be.rejectedWith(/notNull/);
      await factory.create('Disc', { speed: false }).should.be.rejectedWith(/number/);
      await factory.create('Disc', { speed: true }).should.be.rejectedWith(/number/);
      await factory.create('Disc', { speed: '163' }).should.be.rejectedWith(/number/);
      await factory.create('Disc', { speed: { foo: 'bar' } }).should.be.rejectedWith(/number/);
    });

    it('should require a valid glide', async () => {
      await factory.create('Disc', { glide: null }).should.be.rejectedWith(/notNull/);
      await factory.create('Disc', { glide: false }).should.be.rejectedWith(/number/);
      await factory.create('Disc', { glide: true }).should.be.rejectedWith(/number/);
      await factory.create('Disc', { glide: '163' }).should.be.rejectedWith(/number/);
      await factory.create('Disc', { glide: { foo: 'bar' } }).should.be.rejectedWith(/number/);
    });

    it('should require a valid turn', async () => {
      await factory.create('Disc', { turn: null }).should.be.rejectedWith(/notNull/);
      await factory.create('Disc', { turn: false }).should.be.rejectedWith(/number/);
      await factory.create('Disc', { turn: true }).should.be.rejectedWith(/number/);
      await factory.create('Disc', { turn: '163' }).should.be.rejectedWith(/number/);
      await factory.create('Disc', { turn: { foo: 'bar' } }).should.be.rejectedWith(/number/);
    });

    it('should require a valid fade', async () => {
      await factory.create('Disc', { fade: null }).should.be.rejectedWith(/notNull/);
      await factory.create('Disc', { fade: false }).should.be.rejectedWith(/number/);
      await factory.create('Disc', { fade: true }).should.be.rejectedWith(/number/);
      await factory.create('Disc', { fade: '163' }).should.be.rejectedWith(/number/);
      await factory.create('Disc', { fade: { foo: 'bar' } }).should.be.rejectedWith(/number/);
    });
  });
});
