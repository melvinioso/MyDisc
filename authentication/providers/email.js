import { Strategy as LocalStrategy } from 'passport-local';
import db from '../../models';

export const config = {
  usernameField: 'providerId',
  passwordField: 'providerKey',
  passReqToCallback: true,
  session: false,
};

export const handler = async (req, providerId, providerKey, done) => {
  try {
    const user = await db.User.findOne({ where: { providerId } });

    if (!user) {
      return done(null, false, { message: 'User not found.' });
    }

    const authenticated = await user.authenticate(providerKey);

    if (!authenticated) {
      return done(null, false, { message: 'Authentication failed.' });
    }

    return done(null, user);
  } catch (err) {
    return done(err);
  }
};

export const Strategy = new LocalStrategy(config, handler);

export default {
  config,
  Strategy,
  handler,
};
