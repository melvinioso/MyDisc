module.exports = {
  diff: true,
  extension: ['js'],
  package: './package.json',
  reporter: 'spec',
  slow: 75,
  timeout: 2000,
  require: '@babel/register',
  file: ['test/test_globals.js', 'test/hooks.js'],
  recursive: true,
  tracewarnings: true,
};
