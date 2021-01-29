import React from 'react';
import * as Animatable from 'react-native-animatable';
import { PixelRatio, Animated } from 'react-native';
import {
  Typography,
  Colors,
  Constants,
  Assets,
  Spacings,
} from 'react-native-ui-lib';

const { multiply } = Animated;

import { forHorizontalIOS, forUIKit } from './transitionConfigs';

import SettingsButton from '../components/SettingsButton';

Colors.loadColors({
  white: '#ffffff',
  smoke: '#c3cfd9',
  gray: '#788896',
  slate: '#4a5c6b',
  blue: '#2d87d9',
  indigo: '#6557f5',
  purple: '#720fc3',
  pink: '#bd35d1',
  mint: '#1bae9f',
  green: '#217768',
  brown: '#89795e',
  crimson: '#ac6362',
  red: '#d3455b',
  orange: '#e8823a',
  yellow: '#f7c325',
  black: '#000000',
});

Typography.loadTypographies({
  strong: { fontWeight: '700' },
});

Spacings.loadSpacings({
  page: 20,
  gridGutter: 16,
});

export const HIT_SLOP = {
  top: 20,
  right: 20,
  bottom: 20,
  left: 20,
};

export const AssetImages = {
  // logo: require('../../assets/logo.png'),
};

Assets.loadAssetsGroup('general', AssetImages);

export const PIXEL_SIZE = PixelRatio.getPixelSizeForLayoutSize(1);
export const PX = (() => {
  if (PIXEL_SIZE === 2 || PIXEL_SIZE === 3) {
    return 1 / 4;
  } else {
    return 1 / PIXEL_SIZE;
  }
})();

// TODO: Still working with fixed backgrounds in React-navigation
export const defaultScreenOptions = {
  headerShown: false,
  transparentCard: true,
  cardShadowEnabled: false,
  cardStyle: {
    // DO NOT REMOVE
    backgroundColor: 'transparent',
  },
  cardStyleInterpolator: forHorizontalIOS,
  headerStyleInterpolator: forUIKit,
};

export const defaultHeaderOptions = {
  headerShown: true,
  title: 'MyDisc',
  headerStyle: {
    backgroundColor: `${Colors.white}`,
  },
  headerTintColor: `${Colors.indigo}`,
  headerLeft: null,
  headerRight: () => (
    <Animatable.View
      animation="fadeIn"
      duration={300}
      style={{
        position: 'absolute',
        top: 10,
        right: 10,
        zIndex: 9999,
      }}
    >
      <SettingsButton />
    </Animatable.View>
  ),
  transparentCard: true,
  cardShadowEnabled: false,
  cardStyle: {
    // DO NOT REMOVE
    backgroundColor: 'transparent',
  },
  cardStyleInterpolator: forHorizontalIOS,
  headerStyleInterpolator: forUIKit,
};
