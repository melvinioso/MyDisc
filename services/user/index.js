import { difference, camelCase } from 'lodash';
import db from '../../models';

const UserServiceOptions = {
  provider: '',
  providerId: '',
  providerKey: '',
  accessToken: '',
  refreshToken: '',
  permissions: [],
  name: '',
  emails: [],
};

export class UserService {
  options = UserServiceOptions;

  constructor(options) {
    this.options = options;
    this.include = [db.Permission, db.Profile, db.Email];
    this.created = false;
  }

  async upsertUser() {
    const { include } = this;
    const { provider, providerId, accessToken, providerKey } = this.options;

    const preferredKey = providerKey || accessToken;

    const [user, created] = await this.model().findOrCreate({
      where: { providerId },
      defaults: {
        provider,
        providerKey: preferredKey,
      },
    });

    this.user = user;
    this.created = created;

    if (!this.isLocalProvider()) {
      if (user.providerKey !== preferredKey) {
        await user.update({ providerKey: preferredKey });
      }
    }

    await this.buildCompleteProfile();
    await this.user.reload({ include });

    return this.user;
  }

  async addPermissions() {
    await this.user.setStandardPermissions();
  }

  async upsertProfile() {
    const { user } = this;
    const { name } = this.options;

    let options = {};

    if (name) {
      options.name = name;
    }

    let record = await db.Profile.findOne({
      where: { userId: user.id },
    });

    if (record) {
      await record.update(options);
    } else {
      record = await db.Profile.create({
        userId: user.id,
        ...options,
      });
    }

    return record;
  }

  getUserEmails() {
    const { user } = this;
    return db.Email.findAll({
      where: { userId: user.id },
    });
  }

  async upsertEmail() {
    if (!this.options.emails || !this.options.emails.length) {
      return;
    }

    const { user } = this;
    const { emails } = this.options;

    const existingRecords = await this.getUserEmails();
    const existingKeys = existingRecords.map((i) => i.email);
    const emailKeys = emails.map((i) => i.email);
    const newEmails = difference(emailKeys, existingKeys);

    if (newEmails.length) {
      const options = newEmails.map((e) => ({
        userId: user.id,
        email: e,
      }));

      await db.Email.bulkCreate(options);
    }
  }

  async buildCompleteProfile() {
    await this.addPermissions();
    await this.upsertProfile();
    await this.upsertEmail();
  }

  reload() {
    const { include } = this;
    return this.user.reload({
      include,
    });
  }

  type() {
    const model = this.model();
    const instance = new model();
    return camelCase(instance.constructor.name);
  }

  model() {
    let model;

    switch (this.options.provider) {
      default:
        model = db.User;
        break;
    }

    return model;
  }

  isLocalProvider() {
    return ['email'].indexOf(this.options.provider) > -1;
  }
}

export default UserService;
