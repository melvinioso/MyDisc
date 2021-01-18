import { Model } from 'sequelize';
import { isString, isNumber } from './validators';

export default (sequelize, DataTypes) => {
  class Profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate() {
      // define association here
      const { Profile, User } = this.sequelize.models;

      Profile.belongsTo(User, {
        foreignKey: 'userId',
      });
    }
  }
  Profile.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isNumber,
        },
      },
      name: {
        type: DataTypes.STRING,
        validate: {
          isString,
        },
      },
    },
    {
      sequelize,
      modelName: 'Profile',
    }
  );
  return Profile;
};
