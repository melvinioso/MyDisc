import { factory as Factory, SequelizeAdapter } from 'factory-girl';
import faker from 'faker';

import DB from '../../models';

Factory.setAdapter(new SequelizeAdapter());

const { seq } = Factory;

Factory.define('Disc', DB.Disc, {
  userId: Factory.assoc('User', 'id'),
  brand: faker.company.companyName,
  mold: faker.lorem.word,
  plastic: faker.lorem.word,
  weight: faker.random.number({
    min: 150,
    max: 175,
  }),
  speed: faker.random.number({
    min: 1,
    max: 14,
  }),
  glide: faker.random.number({
    min: 1,
    max: 7,
  }),
  turn: faker.random.number({
    min: -5,
    max: 1,
  }),
  fade: faker.random.number({
    min: 0,
    max: 5,
  }),
});

Factory.define('User', DB.User, {
  provider: 'email',
  providerId: seq('User.providerId', (n) => `user-${n}@example.com`),
  providerKey: 'some-api-key',
});

export const factory = Factory;
export const db = DB;
