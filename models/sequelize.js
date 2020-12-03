import configs from '../config/config';
import { Sequelize } from 'sequelize';

const config = configs.db.primary;

export const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    dialect: 'postgres',
    host: config.host,
    port: config.port || 5432,
    // dialectOptions: {
    //   ssl: configs.ssl,
    // },
    define: {
      freezeTableName: true,
    },
    logging: false,
  }
);

export default sequelize;
