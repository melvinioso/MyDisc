import React, { useEffect } from 'react';
import { View, Text, Button as UIButton, Colors } from 'react-native-ui-lib';
import { StyleSheet } from 'react-native';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { get } from 'lodash';

import TextInput from '../../components/TextInput';
import BackButton from '../../components/BackButton';
import BaseScreen from '../../components/BaseScreen';
import { PX } from '../../theme';

const schema = yup.object().shape({
  email: yup.string().email('Not a valid email').required('Email is required'),
});

function ForgotPassword({ navigation }) {
  const { register, handleSubmit, setValue, errors } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    register('email');
  }, [register]);

  async function onSubmit(values) {
    navigation.navigate('EmailSent');
    console.log(values);
  }

  return (
    <BaseScreen
      header={
        <View>
          <BackButton onPress={() => navigation.navigate('SignIn')} />
          <Text text30M mint marginT-40 style={[styles.text]}>
            Enter email address below
          </Text>
        </View>
      }
      fixedFooter={
        <View marginB-40>
          <UIButton
            label="Send email"
            style={styles.button}
            backgroundColor={Colors.mint}
            onPress={handleSubmit(onSubmit)}
          />
        </View>
      }
    >
      <View marginT-80>
        <View>
          <TextInput
            placeholder="Email"
            onChangeText={(text) => setValue('email', text)}
            autoCapitalize="none"
            error={get(errors, 'email')}
            keyboardType="email-address"
          />
        </View>
        <View marginT-20>
          <Text text80M indigo marginT-40 style={[styles.text]}>
            We will email you a link on how to change your password.
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

export default ForgotPassword;
