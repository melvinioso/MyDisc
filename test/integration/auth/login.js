import jwt from 'jsonwebtoken';
import { request, factory } from '../../utils';
import app from '../../../server/index';

describe('Login', () => {
  describe('ROUTE - /auth/user/login', () => {

    it('should log in a user', async () => {
      const user = await factory.create('User', {
        providerKey: 'password1234',
      });

      const res = await request(app)
        .post('/auth/user/login')
        .send({
          providerId: user.providerId,
          providerKey: 'password1234'
        });

      expect(res.body.success).to.equal(true);
      expect(res.body.token).should.exist;
      const decoded = jwt.decode(res.body.token);
      expect(decoded.user.providerId).to.equal(user.providerId);
    });

    it('should NOT log in a user with a bad password', async () => {
      const user = await factory.create('User', {
        providerKey: 'password1234',
      });

      const res = await request(app)
        .post('/auth/user/login')
        .send({
          providerId: user.providerId,
          providerKey: 'badpassword'
        });

      expect(res.body.success).to.equal(false);
    });

    it('should handle user not found', async () => {
      const res = await request(app)
        .post('/auth/user/login')
        .send({
          providerId: 'iamnotfound@example.com',
          providerKey: 'password1234'
        });

      expect(res.body.success).to.equal(false);
    });
  });
});
