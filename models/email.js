import { Model } from 'sequelize';
import { isNumber } from './validators';

export default (sequelize, DataTypes) => {
  class Email extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate() {
      // define association here
      const { Email, User } = this.sequelize?.models;

      Email.belongsTo(User, {
        foreignKey: 'userId',
        constraints: false,
      });
    }
  }
  Email.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isNumber,
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: true,
        },
      },
    },
    {
      sequelize,
      modelName: 'Email',
    }
  );
  return Email;
};
