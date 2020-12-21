import { Sequelize, DataTypes } from 'sequelize';
import sequelize from './sequelize';

import Disc from './disc';
import User from './user';
import Bag from './bag';
import Profile from './profile';
import Email from './email';
import DiscBag from './discbag';

const db = {};

const Models = {
  Disc,
  User,
  Bag,
  Profile,
  Email,
  DiscBag,
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
