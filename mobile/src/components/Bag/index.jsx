import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native-ui-lib';

import BagSvg from '../../../assets/svgs/bag';

function Bag({ color, name, onPress, size, columnWidth, style, ...props }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{ width: columnWidth }}
      {...props}
    >
      <View centerH marginT-20>
        <View style={[{ height: size }, { width: size }, { color: color }]}>
          <BagSvg color={color} />
        </View>
        <View centerH marginT-5>
          <Text text80M>{name}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default Bag;
