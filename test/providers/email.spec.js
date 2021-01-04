import { factory } from '../utils';
import { handler } from '../../authentication/providers/email';

describe.only('Provider - Email', () => {
  describe('handler', () => {
    it('email provider register route', async () => {
      const record = await factory.create('User', {
        providerId: 'local-provider@example.com',
        providerKey: 'password1234',
      });

      let user;
      const fn = (err, u) => user = u;
      await handler({}, 'local-provider@example.com', 'password1234', fn);
      expect(user.id).to.equal(record.id);
    });
  });
});
