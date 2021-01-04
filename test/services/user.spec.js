import { get } from 'lodash';
import { db } from '../utils';
import { UserService } from '../../services/user';

describe('Services - UserService', () => {
  describe('New User', () => {
    it('email provider', async () => {
      const options = {
        provider: 'email',
        providerId: 'sample-user@example.com',
        providerKey: 'password1234',
        name: 'User Sample',
        emails: [
          { email: 'test1@example.com' },
          { email: 'test2@example.com' },
          { email: 'test3@example.com' },
        ],
      };

      const service = new UserService(options);

      await service.upsertUser();

      // Creates a User
      const users = await db.User.findAll({
        where: { providerId: options.providerId },
      });
      expect(users.length).to.equal(1);
      const user = users[0];
      expect(user.provider).to.equal('email');
      expect(user.providerId).to.equal(options.providerId);
      expect(user.providerKey).not.to.equal(options.providerKey);

      // Creates a Profile
      const profiles = await db.Profile.findAll({
        where: { userId: user.id },
      });
      expect(profiles.length).to.equal(1);
      const profile = profiles[0];
      expect(profile.name).to.equal(options.name);

      // Creates an Email
      const emails = await db.Email.findAll({
        where: { userId: user.id },
      });
      expect(emails.length).to.equal(3);
      const keys = emails.map((e) => e.email);
      expect(keys).to.contain(get(options, 'emails.0.email'));
      expect(keys).to.contain(get(options, 'emails.1.email'));
      expect(keys).to.contain(get(options, 'emails.2.email'));
    });
  });
});
