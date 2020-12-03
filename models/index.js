import { Sequelize, DataTypes } from 'sequelize';
import sequelize from './sequelize';

import Disc from './disc';

const db = {};

const Models = {
  Disc,
};

Object.keys(Models).forEach((key) => {
  const model = Models[key](sequelize, DataTypes);
  db[model.name] = model;
});

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
