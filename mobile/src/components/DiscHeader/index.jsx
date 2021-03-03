import React, { useState } from 'react';
import { Text, View, Colors, Button } from 'react-native-ui-lib';
import { StyleSheet, Modal } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { darken, lighten } from 'polished';

import { PX } from '../../theme';

function DiscHeader(props) {
  const [visible, setVisible] = useState(false);

  let {
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
          Please select a disc to view it's details
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
              {brand}
            </Text>
            <Text text50BO textColor>
              {mold}
            </Text>
          </View>
          <View row marginT-6>
            <Text text80M textColor>
              Plastic: {plastic}
            </Text>
            <Text text80M style={[{ marginLeft: 60 * PX }, textColor]}>
              Weight: {weight}
            </Text>
          </View>
          <View spread row marginT-20>
            <View center>
              <Text textColor>Speed</Text>
              <Text text30BO textColor>
                {speed}
              </Text>
            </View>
            <View center>
              <Text textColor>Glide</Text>
              <Text text30BO textColor>
                {glide}
              </Text>
            </View>
            <View center>
              <Text textColor>Turn</Text>
              <Text text30BO textColor>
                {turn}
              </Text>
            </View>
            <View center>
              <Text textColor>Fade</Text>
              <Text text30BO textColor>
                {fade}
              </Text>
            </View>
          </View>
        </View>
        <Button
          outline
          outlineColor={textColor}
          label="Add to Bag"
          style={[styles.addToBag, textColor]}
          size="small"
          onPress={() => setVisible(true)}
        />
      </LinearGradient>
      <Modal visible={visible} animationType="slide" animated>
        <View flex useSafeArea>
          <Text>Hi Modal!</Text>
          <Button
            outlineColor="white"
            label="Close"
            size="small"
            onPress={() => setVisible(false)}
          />
        </View>
      </Modal>
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
  addToBag: {
    position: 'absolute',
    top: 20,
    right: 10,
  },
});

export default DiscHeader;
