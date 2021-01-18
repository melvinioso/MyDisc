const dotenv = require('dotenv-safe');

if (process.env.NODE_ENV !== 'production') {
  // Enable this when ready to swap local config pattern
  // dotenv.load({path:'.env.local'})
  dotenv.config({
    allowEmptyValues: true,
    sample: `${__dirname}/../.env.example`,
  });
}
