import { Model } from 'sequelize';
import { isString, isNumber } from './validators';

export default (sequelize, DataTypes) => {
  class Disc extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate() {
      // define association here
      const { Disc, Bag, DiscBag, User } = this.sequelize?.models;

      Disc.belongsTo(User, {
        foreignKey: 'userId',
        constraints: false,
      });

      Disc.belongsToMany(Bag, {
        through: DiscBag,
        foreignKey: 'discId',
        constraints: false,
      });
    }
  }
  Disc.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isNumber,
        },
      },
      brand: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isString,
        },
      },
      mold: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isString,
        },
      },
      plastic: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isString,
        },
      },
      weight: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isNumber,
        },
      },
      speed: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isNumber,
        },
      },
      glide: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isNumber,
        },
      },
      turn: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isNumber,
        },
      },
      fade: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isNumber,
        },
      },
    },
    {
      sequelize,
      modelName: 'Disc',
    }
  );
  return Disc;
};
