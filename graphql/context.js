import db from '../models/index';

function context({ req, res }) {
  return {
    req,
    db,
  };
}

export default context;
