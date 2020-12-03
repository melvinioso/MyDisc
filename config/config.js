require('dotenv-safe').config({
  allowEmptyValues: true,
});

let postgresPrimary = {
  username: process.env.SQL_USERNAME || '',
  password: process.env.SQL_PASSWORD || '',
  database: process.env.SQL_DATABASE || '',
  host: process.env.SQL_HOST || '',
  port: parseInt(process.env.SQL_PORT || '', 10),
  // ssl: !!process.env.SQL_SSL_REQUIRE,
  dialect: process.env.SQL_DIALECT || 'postgres',
};

const config = {
  port: process.env.PORT || 4000,
  api: {
    host: process.env.API_HOST,
  },
  db: {
    primary: {
      ...postgresPrimary,
      logging: () => process.env.LOG_SQL,
    },
  },
};

export default config;
