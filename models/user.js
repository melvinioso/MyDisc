import { Model } from 'sequelize';
import jwt from 'jsonwebtoken';
import { camelCase, pick } from 'lodash';
import { v4 } from 'uuid';

import config from '../config/config';
import { hashPassword, comparePassword } from '../authentication/password';
import lru from '../services/lru';
import { isString, isValidProvider } from './validators';

export default (sequelize, DataTypes) => {
  class User extends Model {
    modelName() {
      return camelCase(this.constructor.name);
    }
    authenticate(password) {
      if (!password) {
        return Promise.resolve(false);
      }
      return comparePassword(password, this.providerKey);
    }

    async accessCode() {
      const token = await this.token();
      const accessCode = v4();

      lru.set(accessCode, token);

      return accessCode;
    }

    async token() {
      const [record] = await Promise.all([this]);

      let payload = {
        permissions: [],
      };

      const modelName = this.modelName();

      payload[modelName] = pick(record, 'id', 'providerId');

      const token = jwt.sign(payload, config.jwt.secret, {
        expiresIn: '30d',
      });

      return token;
    }

    async hashPassword() {
      const localProviders = ['email'];
      const isLocalProvider = localProviders.indexOf(this.get('provider')) > -1;

      if (isLocalProvider && this.changed('providerKey')) {
        let val = this.get('providerKey');

        if (!val || val === '') {
          throw new Error('Password can not be empty');
        }

        if (isLocalProvider) {
          this.set('providerId', this.providerId.toLowerCase());
        }

        const hash = await hashPassword(val);
        this.set('providerKey', hash);
      }
    }

    async addPermissions(keys) {
      return super.addPermissions(keys);
    }

    async setStandardPermissions() {
      const keys = [
        'disc.list',
        'disc.create',
        'disc.update',
        'disc.destroy',
        'bag.list',
        'bag.create',
        'bag.update',
        'bag.destroy',
      ];

      return this.addPermissions(keys);
    }
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate() {
      // define association here
      const { User, Permission, Bag, Disc, Profile, Email } = this.sequelize.models;

      User.hasMany(Permission, {
        foreignKey: 'userId',
      })

      User.hasMany(Bag, {
        foreignKey: 'userId',
      });

      User.hasMany(Disc, {
        foreignKey: 'userId',
      });

      User.hasOne(Profile, {
        foreignKey: 'userId',
      });

      User.hasMany(Email, {
        foreignKey: 'userId',
      });
    }
  }
  User.init(
    {
      provider: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isValidProvider,
        },
      },
      providerId: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isString,
        },
      },
      providerKey: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isString,
        },
      },
    },
    {
      sequelize,
      modelName: 'User',
      indexes: [
        {
          name: 'user_provider_providerId',
          unique: true,
          fields: ['provider', 'providerId'],
        },
      ],
      hooks: {
        async beforeCreate(instance) {
          await instance.hashPassword(instance);
        },
        async beforeUpdate(instance) {
          await instance.hashPassword(instance);
        },
      },
    }
  );
  return User;
};
