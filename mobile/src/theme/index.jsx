import { PixelRatio } from 'react-native';
import { Typography, Colors, Assets, Spacings } from 'react-native-ui-lib';

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

export const AssetImages = {};

Assets.loadAssetsGroup('general', AssetImages);

export const PIXEL_SIZE = PixelRatio.getPixelSizeForLayoutSize(1);

export const PX = (() => {
  if (PIXEL_SIZE === 2 || PIXEL_SIZE === 3) {
    return 1 / 4;
  } else {
    return 1 / PIXEL_SIZE;
  }
})();

export const defaultScreenOptions = {
  headerShown: false,
  headerTransparent: true,
  cardShadowEnabled: false,
  gestureEnabled: false,
  headerBackTitleVisible: false,
};
