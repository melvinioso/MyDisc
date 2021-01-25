import React from 'react';
import { View, Text, Button as UIButton, Colors } from 'react-native-ui-lib';
import { StyleSheet } from 'react-native';

import BackButton from '../../components/BackButton';
import BaseScreen from '../../components/BaseScreen';
import { PX } from '../../theme';

function EmailSent({ navigation }) {
  return (
    <BaseScreen
      header={
        <View>
          <BackButton onPress={() => navigation.navigate('SignIn')} />
          <Text text30M mint marginT-40 style={[styles.text]}>
            Thank you!
          </Text>
        </View>
      }
      fixedFooter={
        <View marginB-40>
          <UIButton
            label="Back to login"
            style={styles.button}
            backgroundColor={Colors.mint}
            onPress={() => navigation.navigate('SignIn')}
          />
        </View>
      }
    >
      <View marginT-240>
        <View>
          <Text text80M red style={[styles.text]}>
            Check your email shortly for instructions on how to reset your
            password.
          </Text>
        </View>
      </View>
    </BaseScreen>
  );
}

const styles = StyleSheet.create({
  avoid: {
    display: 'flex',
  },
  text: {
    textAlign: 'center',
  },
  button: {
    borderRadius: 70 * PX,
  },
});

export default EmailSent;
