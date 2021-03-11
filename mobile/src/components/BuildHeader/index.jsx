import React, { useState } from 'react';
import { Text, View, Colors, Button } from 'react-native-ui-lib';
import { StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { darken } from 'polished';

import AddDisc from '../../screens/AddDisc';

import { PX } from '../../theme';

function BuildHeader(props) {
  let filteredBags = props;

  return (
    <LinearGradient
      colors={[color, 'white']}
      start={{ x: -0.3, y: 1 }}
      end={{ x: 0.5, y: -0.3 }}
    >
      <View
        style={[
          styles.header,
          {
            borderBottomColor: Colors.slate,
            borderTopColor: Colors.slate,
          },
        ]}
      >
        <View>
          <Text text90BO>{brand}</Text>
          <Text text50BO>{mold}</Text>
        </View>
        <View row marginT-6>
          <Text text80M>Plastic: {plastic}</Text>
          <Text text80M style={[{ marginLeft: 60 * PX }]}>
            Weight: {weight}
          </Text>
        </View>
        <View spread row marginT-20>
          <View center>
            <Text>Speed</Text>
            <Text text30BO>{speed}</Text>
          </View>
          <View center>
            <Text>Glide</Text>
            <Text text30BO>{glide}</Text>
          </View>
          <View center>
            <Text>Turn</Text>
            <Text text30BO>{turn}</Text>
          </View>
          <View center>
            <Text>Fade</Text>
            <Text text30BO>{fade}</Text>
          </View>
        </View>
      </View>
      <Button
        outline
        outlineColor={Colors.black}
        label="Add A Disc"
        style={[styles.addADisc, Colors.black]}
        size="small"
        onPress={() => setVisible(true)}
      />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  header: {
    padding: 60 * PX,
    height: 820 * PX,
    borderBottomWidth: 1,
    justifyContent: 'center',
  },
  addADisc: {
    position: 'absolute',
    top: 20,
    right: 10,
  },
});

export default BuildHeader;
