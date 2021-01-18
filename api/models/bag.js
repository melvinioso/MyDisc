import { Model } from 'sequelize';
import { isString, isNumber } from './validators';

export default (sequelize, DataTypes) => {
  class Bag extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate() {
      // define association here
      const { Bag, Disc, User } = this.sequelize.models;

      Bag.belongsTo(User, {
        foreignKey: 'userId',
      });

      Bag.belongsToMany(Disc, {
        through: 'DiscBag',
        foreignKey: 'bagId',
      });
    }
  }
  Bag.init(
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
        allowNull: false,
        validate: {
          isString,
        },
      },
      capacity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isNumber,
        },
      },
    },
    {
      sequelize,
      modelName: 'Bag',
    }
  );
  return Bag;
};
