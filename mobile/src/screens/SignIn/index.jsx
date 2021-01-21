import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Button as UIButton, Colors } from 'react-native-ui-lib';
import { StyleSheet, KeyboardAvoidingView } from 'react-native';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { get } from 'lodash';

import TextInput from '../../components/TextInput';
import BaseScreen from '../../components/BaseScreen';
import ErrorMessage from '../../components/ErrorMessage';
import { PX } from '../../theme';

import { AuthContext } from '../../context/auth';

const schema = yup.object().shape({
  providerId: yup
    .string()
    .email('Not a valid email')
    .required('Email is required'),
  providerKey: yup.string().required('Password is required'),
});

function SignIn({ navigation }) {
  const [serverError, setServerError] = useState(null);
  const { login } = useContext(AuthContext);
  const { register, handleSubmit, setValue, errors } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    register('providerId');
    register('providerKey');
  }, [register]);

  async function onSubmit(values) {
    try {
      setServerError(null);
      await login(values);
    } catch (e) {
      console.log(e);
      setServerError('Error signing in.');
    }
  }

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
            label="Sign In"
            style={styles.button}
            backgroundColor={Colors.mint}
            onPress={handleSubmit(onSubmit)}
          />
          <UIButton
            label="Forgot Password?"
            style={styles.button}
            marginT-20
            backgroundColor={Colors.mint}
            onPress={() => alert('Forgot Password pressed')}
          />
        </View>
      }
    >
      <KeyboardAvoidingView behavior="position" style={styles.avoid}>
        <View marginT-80>
          <View>
            <TextInput
              placeholder="Email"
              onChangeText={(text) => setValue('providerId', text)}
              autoCapitalize="none"
              error={get(errors, 'providerId')}
              keyboardType="email-address"
            />
          </View>
          <View marginT-20>
            <TextInput
              placeholder="Password"
              onChangeText={(text) => setValue('providerKey', text)}
              autoCapitalize="none"
              error={get(errors, 'providerKey')}
              secureTextEntry
            />
            {serverError ? <ErrorMessage message={serverError} /> : null}
          </View>
        </View>
      </KeyboardAvoidingView>
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

export default SignIn;
