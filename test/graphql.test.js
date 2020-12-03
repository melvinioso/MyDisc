require('dotenv-safe').config({
  allowEmptyValues: true,
});

const chai = require('chai');
const expect = chai.expect;

const url = process.env.API_HOST;
const request = require('supertest')(url);

describe('GraphQL', () => {
  it('Returns all discs', (done) => {
    request
      .post('/graphql')
      .send({ query: '{ discs { id brand mold plastic } }' })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.data.discs).to.have.length(4);
        done();
      });
  });
});
