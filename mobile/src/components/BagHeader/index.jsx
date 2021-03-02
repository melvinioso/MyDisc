import React from 'react';
import { Text, View, Colors } from 'react-native-ui-lib';
import { StyleSheet } from 'react-native';
import { darken } from 'polished';

import { PX } from '../../theme';

function BagHeader(props) {
  let customTextColor;
  let {
    name,
    capacity,
    color,
    putters,
    midranges,
    fairways,
    distance,
    style,
  } = props;

  color = color || Colors.white;

  color === '#ffffff'
    ? (customTextColor = '#000000')
    : (customTextColor = '#ffffff');

  if (Object.keys(props).length === 0) {
    return (
      <View
        style={[
          styles.header,
          {
            backgroundColor: color,
            borderBottomColor: darken(0.1, color),
            borderTopColor: darken(0.1, color),
          },
          style,
        ]}
      >
        <Text text80M indigo center>
          Please select a bag to view it's details
        </Text>
      </View>
    );
  }

  return (
    <View
      style={[
        styles.header,
        {
          backgroundColor: color,
          borderBottomColor: darken(0.1, color),
          borderTopColor: darken(0.1, color),
        },
        style,
      ]}
    >
      <View>
        <View>
          <Text text40BO style={{ color: customTextColor }}>
            {name}
          </Text>
        </View>
        <View row>
          <Text text80M style={{ color: customTextColor }}>
            Capacity: {capacity}
          </Text>
        </View>
        <View spread row marginT-30>
          <View center>
            <Text style={{ color: customTextColor }}>Putters</Text>
            <Text text30BO style={{ color: customTextColor }}>
              {putters}
            </Text>
          </View>
          <View center>
            <Text style={{ color: customTextColor }}>Midranges</Text>
            <Text text30BO style={{ color: customTextColor }}>
              {midranges}
            </Text>
          </View>
          <View center>
            <Text style={{ color: customTextColor }}>Fairways</Text>
            <Text text30BO style={{ color: customTextColor }}>
              {fairways}
            </Text>
          </View>
          <View center>
            <Text style={{ color: customTextColor }}>Distance</Text>
            <Text text30BO style={{ color: customTextColor }}>
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
    borderBottomWidth: 2,
    borderTopWidth: 2,
    justifyContent: 'center',
  },
});

export default BagHeader;
