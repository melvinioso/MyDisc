import { default as passport } from 'passport';
import device from 'device';

import providers from './providers';
import db from '../models';
import config from '../config/config';
import lru from '../services/lru';
import UserService from '../services/user';
import Hashids from 'hashids/cjs';

const hashLength = parseInt(process.env.HASH_ID_LENGTH || '', 10);
const hashids = new Hashids(process.env.HASH_ID_SALT, hashLength);

/**
 * authRedirect
 *
 * Generates an accessCode (LRU Cache)
 * Key is uuid.v4(), Value is a valid JWT
 *
 * Redirects to uri or protocolUri so that
 * client can fetch valid JWT
 */
export async function authRedirect(req, res, err) {
  if (err) {
    return res.json({ err });
  }

  if (!req.user) {
    return res.json({ success: false });
  }

  const code = await req.user.accessCode();
  const userAgent = req.headers['user-agent'];
  const { type } = device(userAgent);
  const isMobile = type === 'phone' || type === 'tablet';

  let redirectUri = isMobile
    ? config.redirects.protocolUri
    : config.redirects.uri;
  redirectUri += `?code=${code}`;

  res.redirect(redirectUri);
}

export function useAuthentication(app) {
  Object.keys(providers).forEach((key) => {
    passport.use(key, providers[key].Strategy);
  });

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    db.User.findByPK(id, (err, user) => {
      done(err, user);
    });
  });

  app.use(passport.initialize());

  app.post('/auth/user/register', async (req, res) => {
    const { name, providerId, providerKey } = req.body;

    if (!providerId || !providerKey) {
      return res.status(400).json({ message: 'Missing parameters' });
    }

    try {
      const userService = new UserService({
        provider: 'email',
        name,
        providerId,
        providerKey,
        emails: [{ email: providerId }],
      });

      const user = await userService.upsertUser();

      const token = await user.token();

      res.json({ success: true, token });
    } catch (err) {
      console.log(err);
      return res.status(500).send('Internal server error');
    }
  });

  app.post('/auth/user/login', async (req, res) => {
    passport.authenticate('email', {}, async (err, user, _info) => {
      if (!user) {
        return res.json({
          success: false,
        });
      }

      req.user = user;

      const token = await user.token();

      res.json({
        success: true,
        token,
      });
    })(req, res);
  });

  app.post('/auth/token', async (req, res) => {
    const { code } = req.body;

    if (!code) {
      return res.status(400).send('Bad request.');
    }

    const token = lru.get(code);

    if (!token) {
      return res.status(404).send('Not found.');
    }

    return res.json({ token });
  });

  /**
   * /auth/providers/:provider
   *
   * Dynamic route for loading provider strategies
   */
  app.get('/auth/providers/:provider', async (req, res) => {
    const { provider } = req.params;

    if (!provider) {
      return { statusCode: 404 };
    }

    passport.authenticate(provider)(req, res, (...args) => {
      console.log('passport authenticated', args);
    });
  });

  /**
   * /auth/providers/:provider/callback
   *
   * Uses provider code to Upsert User (see Strategy) and
   * retrieve profile & accessToken from provider
   *
   * Calls authRedirect to redirect to appropriate url
   */
  app.get('/auth/providers/:provider/callback', async (req, res) => {
    const { provider } = req.params;

    if (!provider) {
      return { statusCode: 404 };
    }

    return passport.authenticate(provider, { session: false })(
      req,
      res,
      (err) => {
        authRedirect(req, res, err);
      }
    );
  });
}
