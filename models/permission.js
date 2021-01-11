import { Model } from 'sequelize';
import { isNumber } from './validators';
import { includes, camelCase } from 'lodash';

export default (sequelize, DataTypes) => {
  class Permission extends Model {
    validKeys;

    constructor(args) {
      super(args);

      this.validKeys = ['no-permission'];
      this.generateValidKeys();
    }

    generateValidKeys() {
      const keys = [
        'no-permission', // Used for test cases
      ];

      Object.keys(this.sequelize.models).forEach((key) => {
        const keyName = camelCase(key);
        keys.push(`${keyName}.list`);
        keys.push(`${keyName}.read`);
        keys.push(`${keyName}.create`);
        keys.push(`${keyName}.update`);
        keys.push(`${keyName}.destroy`);
      });

      this.validKeys = keys;
    }

    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate() {
      const { Permission, User } = this.sequelize.models;

      Permission.belongsTo(User, {
        foreignKey: 'userId',
      });
    }
  }
  Permission.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isNumber,
        },
      },
      key: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          isValidKey(value) {
            if (!includes(this.validKeys, value)) {
              throw new Error('Not a valid key');
            }
          },
        },
      },
    },
    {
      sequelize,
      modelName: 'Permission',
      indexes: [
        {
          name: 'user_permission',
          unique: true,
          fields: ['userId', 'key'],
        },
      ],
    }
  );
  return Permission;
};
