require('../services/env');

var chai = require('chai');
var sinon = require('sinon');
var chaiAsPromised = require('chai-as-promised');
var sinonChai = require('sinon-chai');

chai.should();
chai.use(chaiAsPromised);
chai.use(sinonChai);
chai.use(require('chai-uuid'));

chai.use(function(_chai, _) {
  _chai.Assertion.addMethod('withMessage', function(msg) {
    _.flag(this, 'message', msg);
  });
});

global.chai = chai;
global.chaiAsPromised = chaiAsPromised;
global.expect = chai.expect;
global.assert = chai.assert;
global.request = require('supertest');
global.sinon = sinon;
global.sleep = async ms => new Promise(resolve => setTimeout(resolve, ms));
