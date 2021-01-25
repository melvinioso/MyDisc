import React from 'react';
import { Image as RNUIImage } from 'react-native-ui-lib';

function Image({ source, ...props }) {
  return <RNUIImage source={source} {...props} />;
}

export default Image;
