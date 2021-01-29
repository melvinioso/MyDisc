import React from 'react';
import { Text, View, Colors } from 'react-native-ui-lib';
import { StyleSheet } from 'react-native';
import { PX } from '../../theme';

function BagHeader(props) {
  let customTextColor;
  const {
    name,
    capacity,
    color,
    putters,
    midranges,
    fairways,
    distance,
    style,
  } = props;

  color === '#ffffff'
    ? (customTextColor = '#000000')
    : (customTextColor = '#ffffff');

  return (
    <View style={[styles.header, { backgroundColor: `${color}` }, style]}>
      <View>
        <View>
          <Text text40BO style={{ color: `${customTextColor}` }}>
            {name}
          </Text>
        </View>
        <View row>
          <Text text80M style={{ color: `${customTextColor}` }}>
            Capacity: 16/{capacity}
          </Text>
        </View>
        <View spread row marginT-30>
          <View center>
            <Text style={{ color: `${customTextColor}` }}>Putters</Text>
            <Text text30BO style={{ color: `${customTextColor}` }}>
              {putters}
            </Text>
          </View>
          <View center>
            <Text style={{ color: `${customTextColor}` }}>Midranges</Text>
            <Text text30BO style={{ color: `${customTextColor}` }}>
              {midranges}
            </Text>
          </View>
          <View center>
            <Text style={{ color: `${customTextColor}` }}>Fairways</Text>
            <Text text30BO style={{ color: `${customTextColor}` }}>
              {fairways}
            </Text>
          </View>
          <View center>
            <Text style={{ color: `${customTextColor}` }}>Distance</Text>
            <Text text30BO style={{ color: `${customTextColor}` }}>
              {distance}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    padding: 60 * PX,
    height: 800 * PX,
    borderBottomColor: `${Colors.slate}`,
    borderBottomWidth: 2,
    borderTopColor: `${Colors.slate}`,
    borderTopWidth: 2,
  },
  details: {},
  ratings: {},
});

export default BagHeader;
