if (process.env.NODE_ENV !== 'production') {
  require('dotenv-safe').config();
}

function envDefault(key, defaultValue) {
  if (typeof process.env[key] !== 'undefined') {
    return process.env[key];
  } else {
    return defaultValue;
  }
}

const config = {
  expo: {
    name: 'mobile',
    slug: 'mobile',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/icon.png',
    splash: {
      image: './assets/splash.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff',
    },
    updates: {
      fallbackToCacheTimeout: 0,
    },
    assetBundlePatterns: ['**/*'],
    ios: {
      supportsTablet: true,
    },
    web: {
      favicon: './assets/favicon.png',
    },
    extra: {
      apiHost: envDefault('API_HOST', 'http://localhost:4000'),
    },
  },
};

export default config;
