import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native-ui-lib';
import { StyleSheet } from 'react-native';

function Disc({ size, color, brand, mold, onPress, style, ...props }) {
  let borderColor;

  color === '#ffffff' ? (borderColor = '#000000') : (borderColor = '#ffffff');

  const BR = size / 2;
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[{ height: size }, { width: size }, style]}
      {...props}
    >
      <View flex center>
        <View
          style={[
            { backgroundColor: `${color}` },
            { borderColor: borderColor },
            { borderWidth: 1 },
            { height: size },
            { width: size },
            { borderRadius: BR },
          ]}
        />
        <View center>
          <Text>{brand}</Text>
          <Text>{mold}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({});

export default Disc;
