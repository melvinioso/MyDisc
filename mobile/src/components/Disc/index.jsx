import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native-ui-lib';
import { StyleSheet, Dimensions, Alert } from 'react-native';

const { width } = Dimensions.get('window');
const ITEM_WIDTH = width / 4;
const CIRCLE = ITEM_WIDTH * 0.8;
const BR = CIRCLE / 2;

function Disc({ color, brand, mold, onPress, style, index, ...props }) {
  let borderColor;

  color === '#ffffff' ? (borderColor = '#000000') : (borderColor = '#ffffff');

  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.disc}
      onLongPress={() => {
        Alert.alert('LONG PRESS!');
      }}
      {...props}
    >
      <View centerH marginT-20>
        <View
          style={[
            { backgroundColor: color },
            { borderColor: borderColor },
            { borderWidth: 1 },
            { height: CIRCLE },
            { width: CIRCLE },
            { borderRadius: BR },
          ]}
        />
        <View centerH marginT-5>
          <Text text90R>{brand}</Text>
          <Text text90R>{mold}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  disc: {
    width: ITEM_WIDTH,
  },
});

export default Disc;
