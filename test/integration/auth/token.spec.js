import jwt from 'jsonwebtoken';
import { request, factory } from '../../utils';
import app from '../../../server/index';

describe('ROUTE - /auth/token', () => {
  it('return a JWT from a code', async () => {
    const user = await factory.create('User');
    
    const code = await user.accessCode();
    
    const res = await request(app)
    .post('/auth/token')
    .send({
      code,
    });

    expect(res.body.token).should.exist;
    const decoded = jwt.decode(res.body.token);
    expect(decoded.user.providerId).to.equal(user.providerId);
  });
});
