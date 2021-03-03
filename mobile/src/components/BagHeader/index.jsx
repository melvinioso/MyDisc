import React from 'react';
import { Text, View, Colors } from 'react-native-ui-lib';
import { StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { darken, lighten } from 'polished';

import { PX } from '../../theme';

function BagHeader(props) {
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

  const borderColor = darken(0.1, color);
  const bgColor = lighten(0.15, color);
  const textColor = Colors.black;

  if (Object.keys(props).length === 0) {
    return (
      <View
        style={[
          styles.header,
          {
            borderBottomColor: borderColor,
            borderTopColor: borderColor,
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
    <>
      <LinearGradient
        colors={[bgColor, 'white']}
        start={{ x: 1, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={[styles.header, style]}
      >
        <View style={[styles.container]}>
          <View>
            <Text text90BO textColor>
              {' '}
            </Text>
            <Text text50BO textColor>
              {name}
            </Text>
          </View>
          <View row marginT-6>
            <Text text80M textColor>
              Capacity: {capacity}
            </Text>
          </View>
          <View spread row marginT-20>
            <View center>
              <Text textColor>Putters</Text>
              <Text text30BO textColor>
                6
              </Text>
            </View>
            <View center>
              <Text textColor>Midranges</Text>
              <Text text30BO textColor>
                6
              </Text>
            </View>
            <View center>
              <Text textColor>Fairways</Text>
              <Text text30BO textColor>
                8
              </Text>
            </View>
            <View center>
              <Text textColor>Distance</Text>
              <Text text30BO textColor>
                0
              </Text>
            </View>
          </View>
        </View>
      </LinearGradient>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  header: {
    padding: 60 * PX,
    height: 820 * PX,
    borderBottomWidth: 2,
    borderTopWidth: 2,
    justifyContent: 'center',
  },
});

export default BagHeader;
