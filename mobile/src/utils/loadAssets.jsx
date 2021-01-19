import { Image } from 'react-native';
import * as Font from 'expo-font';
import { Asset } from 'expo-asset';
import {
  Octicons,
  Ionicons,
  MaterialIcons,
  Feather,
  Foundation,
  MaterialCommunityIcons,
  FontAwesome,
  AntDesign,
} from '@expo/vector-icons';

import { AssetImages } from '../theme';

function cacheImages(images) {
  return images.map((image) => {
    if (typeof image === 'string') {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}

function cacheFonts(fonts) {
  return fonts.map((font) => Font.loadAsync(font));
}

export async function loadAssetsAsync() {
  const imageAssets = cacheImages(Object.values(AssetImages));

  const fontAssets = cacheFonts([
    Octicons.font,
    Ionicons.font,
    MaterialIcons.font,
    Feather.font,
    Foundation.font,
    MaterialCommunityIcons.font,
    FontAwesome.font,
    AntDesign.font,
  ]);

  await Promise.all([...imageAssets, ...fontAssets]);
}
