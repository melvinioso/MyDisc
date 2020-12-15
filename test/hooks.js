const db = require('../models').default;

before(async () => {
  await db.sequelize.sync({ force: true });
});

after(async () => {
  await db.sequelize.close();
});
