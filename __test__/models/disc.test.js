import { factory } from '../utils/factory';

describe('Model - Disc', () => {
  test('should create a disc', async() => {
    const record = await factory.create('Disc', { brand: 'Discraft' });
    expect(record.brand).toEqual('Discraft');
  });
  describe('Validations', () => {
    
    test('should require a valid brand', async () => {
      await expect(factory.create('Disc', { brand: null })).rejects.toThrow();
      await expect(factory.create('Disc', { brand: false })).rejects.toThrow();
      await expect(factory.create('Disc', { brand: true })).rejects.toThrow();
      await expect(factory.create('Disc', { brand: 123 })).rejects.toThrow();
      await expect(factory.create('Disc', { brand: { foo: 'bar' } })).rejects.toThrow();

      await expect(factory.create('Disc', { brand: 'Innova' })).resolves.toBeDefined();
    });

    test('should require a valid mold', async () => {
      await expect(factory.create('Disc', { mold: null })).rejects.toThrow();
      await expect(factory.create('Disc', { mold: false })).rejects.toThrow();
      await expect(factory.create('Disc', { mold: true })).rejects.toThrow();
      await expect(factory.create('Disc', { mold: 123 })).rejects.toThrow();
      await expect(factory.create('Disc', { mold: { foo: 'bar' } })).rejects.toThrow();

      await expect(factory.create('Disc', { mold: 'Colt' })).resolves.toBeDefined();
    });

    test('should require a valid plastic', async () => {
      await expect(factory.create('Disc', { plastic: null })).rejects.toThrow();
      await expect(factory.create('Disc', { plastic: false })).rejects.toThrow();
      await expect(factory.create('Disc', { plastic: true })).rejects.toThrow();
      await expect(factory.create('Disc', { plastic: 123 })).rejects.toThrow();
      await expect(factory.create('Disc', { plastic: { foo: 'bar' } })).rejects.toThrow();

      await expect(factory.create('Disc', { plastic: 'DX' })).resolves.toBeDefined();
    });

    test('should require a valid weight', async () => {
      await expect(factory.create('Disc', { weight: null })).rejects.toThrow();
      await expect(factory.create('Disc', { weight: false })).rejects.toThrow();
      await expect(factory.create('Disc', { weight: true })).rejects.toThrow();
      await expect(factory.create('Disc', { weight: '123' })).rejects.toThrow();
      await expect(factory.create('Disc', { weight: { foo: 'bar' } })).rejects.toThrow();

      await expect(factory.create('Disc', { weight: 165 })).resolves.toBeDefined();
    });

    test('should require a valid speed', async () => {
      await expect(factory.create('Disc', { speed: null })).rejects.toThrow();
      await expect(factory.create('Disc', { speed: false })).rejects.toThrow();
      await expect(factory.create('Disc', { speed: true })).rejects.toThrow();
      await expect(factory.create('Disc', { speed: '123' })).rejects.toThrow();
      await expect(factory.create('Disc', { speed: { foo: 'bar' } })).rejects.toThrow();

      await expect(factory.create('Disc', { speed: 3 })).resolves.toBeDefined();
    });

    test('should require a valid glide', async () => {
      await expect(factory.create('Disc', { glide: null })).rejects.toThrow();
      await expect(factory.create('Disc', { glide: false })).rejects.toThrow();
      await expect(factory.create('Disc', { glide: true })).rejects.toThrow();
      await expect(factory.create('Disc', { glide: '123' })).rejects.toThrow();
      await expect(factory.create('Disc', { glide: { foo: 'bar' } })).rejects.toThrow();

      await expect(factory.create('Disc', { glide: 4 })).resolves.toBeDefined();
    });

    test('should require a valid turn', async () => {
      await expect(factory.create('Disc', { turn: null })).rejects.toThrow();
      await expect(factory.create('Disc', { turn: false })).rejects.toThrow();
      await expect(factory.create('Disc', { turn: true })).rejects.toThrow();
      await expect(factory.create('Disc', { turn: '123' })).rejects.toThrow();
      await expect(factory.create('Disc', { turn: { foo: 'bar' } })).rejects.toThrow();

      await expect(factory.create('Disc', { turn: -1 })).resolves.toBeDefined();
    });

    test('should require a valid fade', async () => {
      await expect(factory.create('Disc', { fade: null })).rejects.toThrow();
      await expect(factory.create('Disc', { fade: false })).rejects.toThrow();
      await expect(factory.create('Disc', { fade: true })).rejects.toThrow();
      await expect(factory.create('Disc', { fade: '123' })).rejects.toThrow();
      await expect(factory.create('Disc', { fade: { foo: 'bar' } })).rejects.toThrow();

      await expect(factory.create('Disc', { fade: 1 })).resolves.toBeDefined();
    });

  });
});