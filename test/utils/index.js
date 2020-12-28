import { contentType } from 'mime-types'
import { extname } from 'path';
import request from 'supertest';
import { factory, db } from './factory';

async function query(query, variables, token) {
  if (!query) {
    throw new Error('query is required');
  }

  let options = { query };

  if (variables) {
    options.variables = variables;
  }

  if (token) {
    return request(global.listener)
      .post('/graphql')
      .set('Authorization', `Bearer ${token}`)
      .send(options)
  }

  return request(global.listener)
    .post('/graphql')
    .send(options)
}

function formQuery(query, variables = {}, token) {
  const [uploads, vars] = Object.keys(variables).reduce((memo, key) => {
    const [uploads, vars] = memo;
    const value = variables[key];
    if (typeof value === 'string' && contentType(extname(value))) {
      uploads[key] = variables[key];
      vars[key] = null;
    } else {
      vars[key] = variables[key];
    }

    return memo;
  }, [{}, {}]);

  const map = Object.assign(
    {},
    Object.keys(uploads).map(key => [`variables.${key}`])
  );

  const req = request(global.listener)
    .post('/graphql')
    .field('operations', JSON.stringify({ query, variables: vars }))
    .field('map', JSON.stringify(map));

  if (token) {
    req.set('Authorization', `Bearer ${token}`);
  }

  Object.values(uploads).forEach((value, i) => {
    req.attach(`${i}`, value);
  });

  return req;
};

const mutate = query;
const formMutate = formQuery;

export {
  request,
  factory,
  db,
  query,
  mutate,
  formQuery,
  formMutate,
}
