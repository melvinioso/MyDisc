import React, { useState } from 'react';
import { Text, View, Colors, Button } from 'react-native-ui-lib';
import { StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { darken } from 'polished';

import AddBag from '../../screens/AddBag';

import { PX } from '../../theme';

function BagHeader(props) {
  const [visible, setVisible] = useState(false);

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

  function close() {
    setVisible(false);
  }

  if (Object.keys(props).length === 0) {
    return (
      <View
        style={[
          styles.header,
          {
            backgroundColor: Colors.white,
            borderBottomColor: borderColor,
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
        colors={[color, 'white']}
        start={{ x: -0.3, y: 1 }}
        end={{ x: 0.5, y: -0.3 }}
      >
        <View
          style={[
            styles.header,
            {
              borderBottomColor: borderColor,
              borderTopColor: borderColor,
            },
          ]}
        >
          <View>
            <Text text90BO> </Text>
            <Text text50BO>{name}</Text>
          </View>
          <View row marginT-6>
            <Text text80M>Capacity: {capacity}</Text>
          </View>
          <View spread row marginT-20>
            <View center>
              <Text>Putters</Text>
              <Text text30BO>6</Text>
            </View>
            <View center>
              <Text>Midranges</Text>
              <Text text30BO>6</Text>
            </View>
            <View center>
              <Text>Fairways</Text>
              <Text text30BO>8</Text>
            </View>
            <View center>
              <Text>Distance</Text>
              <Text text30BO>0</Text>
            </View>
          </View>
        </View>
        <Button
          outline
          outlineColor={Colors.black}
          label="Add A Bag"
          style={[styles.addABag, Colors.black]}
          size="small"
          onPress={() => setVisible(true)}
        />
      </LinearGradient>
      <AddBag visible={visible} close={close} />
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    padding: 60 * PX,
    height: 820 * PX,
    borderBottomWidth: 1,
    justifyContent: 'center',
  },
  addABag: {
    position: 'absolute',
    top: 20,
    right: 10,
  },
});

export default BagHeader;
