import { factory } from '../utils/factory';

describe('Model - Email', () => {
  it('should create an email', async() => {
    const user = await factory.create('User');
    await factory.create('Email', {
      userId: user.id,
      email: 'test@example.com',
    }).should.be.fulfilled;
  });

  describe('Validations', () => {
    it('should require a valid userId', async () => {
      const user = await factory.create('User');
      await factory.create('Email', { userId: null }).should.be.rejectedWith(/notNull/);
      await factory.create('Email', { userId: false }).should.be.rejectedWith(/number/);
      await factory.create('Email', { userId: true }).should.be.rejectedWith(/number/);
      await factory.create('Email', { userId: '163' }).should.be.rejectedWith(/number/);
      await factory.create('Email', { userId: { foo: 'bar' } }).should.be.rejectedWith(/number/);
      await factory.create('Email', { userId: user.id }).should.be.fulfilled;
    });

    it('should require a valid email', async () => {
      await factory.create('Email', { email: null }).should.be.rejectedWith(/notNull/);
      await factory.create('Email', { email: false }).should.be.rejectedWith(/email/);
      await factory.create('Email', { email: true }).should.be.rejectedWith(/email/);
      await factory.create('Email', { email: 123 }).should.be.rejectedWith(/email/);
      await factory.create('Email', { email: 'test@' }).should.be.rejectedWith(/email/);
      await factory.create('Email', { email: 'test.com' }).should.be.rejectedWith(/email/);
      await factory.create('Email', { email: 'test user@example.com' }).should.be.rejectedWith(/email/);
      await factory.create('Email', { email: 'testuser@example com' }).should.be.rejectedWith(/email/);
    });
  });
});
