import React from 'react';
import { View, Text, Button as UIButton, Colors } from 'react-native-ui-lib';
import { StyleSheet } from 'react-native';

import BaseScreen from '../../components/BaseScreen';
import useStatusBar from '../../hooks/useStatusBar';
import { PX } from '../../theme';

function Welcome({ navigation }) {
  useStatusBar('dark-content', true);

  return (
    <BaseScreen
      header={
        <Text text30M mint marginT-40 style={[styles.text]}>
          Welcome to MyDisc
        </Text>
      }
      fixedFooter={
        <View marginB-40>
          <UIButton
            label="Existing User"
            style={styles.button}
            backgroundColor={Colors.mint}
            onPress={() => navigation.navigate('SignIn')}
          />
          <UIButton
            label="New User"
            style={styles.button}
            marginT-20
            backgroundColor={Colors.mint}
            onPress={() => navigation.navigate('Register')}
          />
        </View>
      }
    />
  );
}

const styles = StyleSheet.create({
  text: {
    textAlign: 'center',
  },
  button: {
    borderRadius: 70 * PX,
  },
});

export default Welcome;
