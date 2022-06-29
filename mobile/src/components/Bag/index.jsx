import React from 'react';
import { Text, View } from 'react-native-ui-lib';
import { StyleSheet, Dimensions } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';

import BagSvg from '../../../assets/svgs/bag';

const { width } = Dimensions.get('window');
const HEIGHT = width / 4;
const ITEM_HEIGHT = HEIGHT * 0.75;

function Bag(props) {
  const { name, capacity, color, discs } = props;

  const discTypes = (type) => {
    let filtered = discs.filter((disc) => {
      return disc.type === type;
    });

    return filtered.length;
  };

  return (
    <View
      row
      style={[
        { backgroundColor: Colors.white },
        { height: HEIGHT },
        { width: width },
        { alignItems: 'center' },
      ]}
    >
      <View
        marginL-14
        marginR-14
        style={(styles.bag, [{ height: ITEM_HEIGHT }, { width: ITEM_HEIGHT }])}
      >
        <BagSvg color={color} />
      </View>
      <View style={[{ alignItems: 'left', justifyContent: 'center' }]}>
        <View row center>
          <Text text70M indigo>
            {name}
          </Text>
          <View row marginL-20>
            <Text text80M mint>
              Discs: {discs.length} / {capacity}
            </Text>
          </View>
        </View>
        <View row marginT-4>
          <View column>
            <Text text90L>Putters:</Text>
            <Text text90L>Midranges:</Text>
          </View>
          <View column marginL-10>
            <Text text90M>{discTypes('Putter')}</Text>
            <Text text90M>{discTypes('Midrange')}</Text>
          </View>
          <View column marginL-20>
            <Text text90L>Fairways:</Text>
            <Text text90L>Distance:</Text>
          </View>
          <View column marginL-10>
            <Text text90M>{discTypes('Fairway')}</Text>
            <Text text90M>{discTypes('Distance')}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bag: {
    position: 'absolute',
  },
});

export default Bag;
