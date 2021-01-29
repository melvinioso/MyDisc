import React from 'react';
import { Text, View, Colors } from 'react-native-ui-lib';
import { StyleSheet } from 'react-native';
import { PX } from '../../theme';

function DiscHeader(props) {
  let customTextColor;
  const {
    brand,
    mold,
    plastic,
    weight,
    color,
    speed,
    glide,
    turn,
    fade,
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
            {brand} {mold}
          </Text>
        </View>
        <View row>
          <Text text80M style={{ color: `${customTextColor}` }}>
            Plastic: {plastic}
          </Text>
          <Text
            text80M
            style={[{ marginLeft: 60 * PX }, { color: `${customTextColor}` }]}
          >
            Weight: {weight}
          </Text>
        </View>
        <View spread row marginT-30>
          <View center>
            <Text style={{ color: `${customTextColor}` }}>Speed</Text>
            <Text text30BO style={{ color: `${customTextColor}` }}>
              {speed}
            </Text>
          </View>
          <View center>
            <Text style={{ color: `${customTextColor}` }}>Glide</Text>
            <Text text30BO style={{ color: `${customTextColor}` }}>
              {glide}
            </Text>
          </View>
          <View center>
            <Text style={{ color: `${customTextColor}` }}>Turn</Text>
            <Text text30BO style={{ color: `${customTextColor}` }}>
              {turn}
            </Text>
          </View>
          <View center>
            <Text style={{ color: `${customTextColor}` }}>Fade</Text>
            <Text text30BO style={{ color: `${customTextColor}` }}>
              {fade}
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

export default DiscHeader;
