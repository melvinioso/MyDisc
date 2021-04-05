import React from 'react';
import { Text, View } from 'react-native-ui-lib';
import { StyleSheet, Dimensions } from 'react-native';
import { darken } from 'polished';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { Entypo } from '@expo/vector-icons';

const { width } = Dimensions.get('window');
const HEIGHT = width / 4;
const LINE_HEIGHT = HEIGHT * 0.9;
const ITEM_HEIGHT = LINE_HEIGHT * 0.75;
const BR = ITEM_HEIGHT / 2;

function type(speed) {
  if (speed >= 1 && speed <= 3) return 'Putter';
  if (speed >= 4 && speed <= 5) return 'Midrange';
  if (speed >= 6 && speed <= 8) return 'Fairway Driver';
  if (speed >= 9 && speed <= 14) return 'Distance Driver';
}

function Disc(props) {
  const {
    brand,
    mold,
    plastic,
    color,
    weight,
    speed,
    glide,
    turn,
    fade,
  } = props;

  return (
    <View
      row
      style={[
        { backgroundColor: Colors.white },
        { height: LINE_HEIGHT },
        { width: width },
        { alignItems: 'center' },
      ]}
    >
      <View
        marginL-14
        marginR-14
        style={
          (styles.disc,
          [
            { backgroundColor: color },
            { borderColor: darken(0.1, color) },
            { borderWidth: 1 },
            { height: ITEM_HEIGHT },
            { width: ITEM_HEIGHT },
            { borderRadius: BR },
          ])
        }
      />
      <View style={[{ alignItems: 'left', justifyContent: 'center' }]}>
        <View>
          <Text text70H>{mold}</Text>
        </View>
        <View row centerV>
          <Text text90M>{brand.trim().toUpperCase()}</Text>
          <Entypo name="dot-single" size={12} color={Colors.black} />
          <Text text90M>{plastic.toUpperCase()}</Text>
        </View>
        <View row centerV>
          <Text text90L>{type(speed).toUpperCase()}</Text>
          <Text text90L marginL-14>
            {speed} | {glide} | {turn} | {fade}
          </Text>
          <Text text90L marginL-14>
            {weight}g
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  disc: {
    position: 'absolute',
  },
});

export default Disc;
