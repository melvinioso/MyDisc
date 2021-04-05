import React, { useState } from 'react';
import { View, Colors, Button } from 'react-native-ui-lib';
import { StyleSheet } from 'react-native';
import { darken } from 'polished';

import AddDisc from '../../screens/AddDisc';

import { PX } from '../../theme';

function DiscHeader() {
  const [visible, setVisible] = useState(false);

  const borderColor = darken(0.1, Colors.white);

  function close() {
    setVisible(false);
  }

  return (
    <>
      <View
        style={[
          styles.header,
          {
            backgroundColor: Colors.white,
            borderBottomColor: borderColor,
          },
        ]}
      >
        <Button
          outline
          outlineColor={Colors.black}
          label="Add A Disc"
          style={[styles.addADisc, Colors.black]}
          size="small"
          onPress={() => setVisible(true)}
        />
      </View>
      <AddDisc visible={visible} close={close} />
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
  addADisc: {
    position: 'absolute',
    top: 20,
    right: 10,
  },
});

export default DiscHeader;
