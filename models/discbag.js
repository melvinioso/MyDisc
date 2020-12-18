import { Model } from 'sequelize';
import { isNumber } from './validators';

export default (sequelize, DataTypes) => {
  class DiscBag extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate() {
      // define association here
      const { DiscBag, Disc, Bag } = this.sequelize?.models;

      DiscBag.belongsTo(Disc, {
        foreignKey: 'discId',
        targetKey: 'id',
        constraints: false,
      });

      DiscBag.belongsTo(Bag, {
        foreignKey: 'bagId',
        targetKey: 'id',
        constraints: false,
      });
    }
  }
  DiscBag.init(
    {
      discId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isNumber,
        },
      },
      bagId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isNumber,
        },
      },
    },
    {
      sequelize,
      modelName: 'DiscBag',
    }
  );
  return DiscBag;
};
