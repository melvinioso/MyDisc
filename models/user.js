import { Model } from 'sequelize';
import { isString } from './validators';

export default (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate() {
      // define association here
      const { User, Bag, Disc, Profile, Email } = this.sequelize?.models;

      User.hasMany(Bag, {
        foreignKey: 'userId',
        constraints: false,
      });

      User.hasMany(Disc, {
        foreignKey: 'userId',
        constraints: false,
      });

      User.hasOne(Profile, {
        foreignKey: 'userId',
        constraints: false,
      });

      User.hasMany(Email, {
        foreignKey: 'userId',
        constraints: false,
      });
    }
  }
  User.init(
    {
      provider: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isString,
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
    }
  );
  return User;
};
