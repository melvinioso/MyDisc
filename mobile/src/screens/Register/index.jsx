import React, { useEffect, useContext } from 'react';
import {
  View,
  Text,
  Button as UIButton,
  Colors,
  Constants,
} from 'react-native-ui-lib';
import { StyleSheet, KeyboardAvoidingView } from 'react-native';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { get } from 'lodash';

import TextInput from '../../components/TextInput';
import BackButton from '../../components/BackButton';
import BaseScreen from '../../components/BaseScreen';
import { PX } from '../../theme';

import { AuthContext } from '../../context/auth';

const schema = yup.object().shape({
  name: yup.string().required('Name is required'),
  providerId: yup
    .string()
    .email('Not a valid email')
    .required('Email is required'),
  providerKey: yup.string().required('Password is required'),
  confirm: yup
    .string()
    .oneOf([yup.ref('providerKey'), null], 'Passwords must match')
    .required('Confirm is required'),
});

function CreateAccount({ navigation }) {
  const { register: reg } = useContext(AuthContext);
  const { register, handleSubmit, setValue, errors } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    register('name');
    register('providerId');
    register('providerKey');
    register('confirm');
  }, [register]);

  async function onSubmit(values) {
    console.log(values);
    await reg({
      name: values.name,
      providerId: values.providerId,
      providerKey: values.providerKey,
    });
  }

  return (
    <BaseScreen
      header={
        <View>
          <BackButton onPress={() => navigation.navigate('Welcome')} />
          <Text text30M mint marginT-40 style={[styles.text]}>
            New Account
          </Text>
        </View>
      }
      fixedFooter={
        <View marginB-40>
          <UIButton
            label="Create Account"
            style={styles.button}
            backgroundColor={Colors.mint}
            onPress={handleSubmit(onSubmit)}
          />
        </View>
      }
    >
      <KeyboardAvoidingView behavior="position" style={styles.avoid}>
        <View marginT-80>
          <View>
            <TextInput
              placeholder="Name"
              onChangeText={(text) => setValue('name', text)}
              autoCapitalize="none"
              error={get(errors, 'name')}
            />
          </View>
          <View marginT-20>
            <TextInput
              placeholder="Email"
              onChangeText={(text) => setValue('providerId', text)}
              autoCapitalize="none"
              error={get(errors, 'providerId')}
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
          </View>
          <View marginT-20>
            <TextInput
              placeholder="Confirm"
              onChangeText={(text) => setValue('confirm', text)}
              autoCapitalize="none"
              error={get(errors, 'confirm')}
              secureTextEntry
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </BaseScreen>
  );
}

const styles = StyleSheet.create({
  avoid: {
    display: 'flex',
    height: Constants.screenHeight - 1100 * PX,
  },
  text: {
    textAlign: 'center',
  },
  button: {
    borderRadius: 70 * PX,
  },
});

export default CreateAccount;
