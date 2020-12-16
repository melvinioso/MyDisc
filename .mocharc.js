module.exports = {
  diff: true,
  extension: ["js"],
  package: "./package.json",
  reporter: "spec",
  slow: 75,
  timeout: 2000,
  file: "test/test_globals",
  file: "test/hooks.js",
  require: "@babel/register",
  recursive: true
}
