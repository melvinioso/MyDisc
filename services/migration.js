import Umzug from 'umzug';
import Sequelize from 'sequelize';
import sequelizeInstance from '../models/sequelize';

class Migration {
  constructor(options = {}) {
    this.umzug = new Umzug({
      storage: 'sequelize',
      storageOptions: {
        sequelize: sequelizeInstance,
      },
      migrations: {
        params: [sequelizeInstance.queryInterface, Sequelize],
        path: 'migrations',
      },
      logging: options.logging || false,
    });
  }

  async up(options) {
    return this.umzug.up(options);
  }

  async down(options) {
    return this.umzug.down(options);
  }
}

export default Migration;
