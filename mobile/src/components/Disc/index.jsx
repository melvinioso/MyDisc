import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native-ui-lib';
import { StyleSheet } from 'react-native';

import { HIT_SLOP } from '../../theme';

function Disc({ size, color, brand, mold, onPress, style, ...props }) {
  const BR = size / 2;
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[{ height: size }, { width: size }, { borderRadius: BR }, style]}
      backgroundColor={color}
      hitSlop={HIT_SLOP}
      {...props}
    >
      <View flex center>
        <View>
          <Text>{brand}</Text>
          <Text>{mold}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({});

export default Disc;
