import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native-ui-lib';
import { StyleSheet, Dimensions } from 'react-native';

import BagSvg from '../../../assets/svgs/bag';

const { width } = Dimensions.get('window');
const ITEM_WIDTH = width / 2;
const BAG = ITEM_WIDTH * 0.8;

function Bag({ color, name, onPress, style, ...props }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.bag} {...props}>
      <View centerH marginT-20>
        <View style={[{ height: BAG }, { width: BAG }, { color: color }]}>
          <BagSvg color={color} />
        </View>
        <View centerH marginT-5>
          <Text text80M>{name}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  bag: {
    width: ITEM_WIDTH,
  },
});

export default Bag;
