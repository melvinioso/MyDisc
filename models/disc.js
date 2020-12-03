import { Model } from 'sequelize';
import { isString } from './validators';

export default (sequelize, DataTypes) => {
  class Disc extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate() {
      // define association here
    }
  }
  Disc.init(
    {
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
          isNumeric: true,
        },
      },
      speed: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isNumeric: true,
        },
      },
      glide: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isNumeric: true,
        },
      },
      turn: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isNumeric: true,
        },
      },
      fade: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isNumeric: true,
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
