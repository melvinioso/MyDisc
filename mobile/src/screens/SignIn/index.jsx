import React, { useEffect, useContext } from 'react';
import { View, Text, Button, Colors } from 'react-native-ui-lib';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import { ActivityIndicator, TouchableOpacity } from 'react-native';

import TextField from '../../components/TextField';

import { AuthContext } from '../../context/auth';
import { ToastContext } from '../../context/toast';

const schema = yup.object().shape({
  providerId: yup
    .string()
    .email('Not a valid email')
    .required('Email is required'),
  providerKey: yup.string().required('Password is required'),
});

function SignIn({ navigation }) {
  const { notify } = useContext(ToastContext);
  const { login } = useContext(AuthContext);
  const { register, handleSubmit, setValue, errors, formState } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    register('providerId');
    register('providerKey');
  }, [register]);

  async function onSubmit(values) {
    try {
      await login(values);
    } catch (e) {
      notify({
        title: 'Oops',
        message: e.message,
      });
    }
  }

  return (
    <View flex style={{ width: '100%' }}>
      <KeyboardAwareScrollView
        contentContainerStyle={{
          height: '100%',
          justifyContent: 'center',
        }}
        keyboardDismissMode="interactive"
      >
        <View paddingH-30>
          <Text text50BO mint>
            Sign In
          </Text>

          <View marginT-20>
            <View marginT-10>
              <TextField
                title="Email"
                autoCapitalize="none"
                autoCompleteType="email"
                keyboardType="email-address"
                clearButtonMode="while-editing"
                onChangeText={(val) => setValue('providerId', val)}
                error={errors?.providerId?.message}
              />
            </View>

            <View marginT-10>
              <TextField
                title="Password"
                secureTextEntry
                onChangeText={(val) => setValue('providerKey', val)}
                error={errors?.providerKey?.message}
              />
            </View>
          </View>
          <View marginT-20>
            <View>
              <Button
                marginT-30
                bg-mint
                style={[{ paddingVertical: 15 }]}
                onPress={handleSubmit(onSubmit)}
              >
                {formState.isSubmitting ? (
                  <ActivityIndicator color={Colors.white} />
                ) : (
                  <Text text60R white>
                    Sign In
                  </Text>
                )}
              </Button>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Register');
                }}
              >
                <Text text70L indigo center marginT-20>
                  I don't have an account
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('ForgotPassword');
                }}
              >
                <Text text70L indigo center marginT-10>
                  Forgot Password?
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}

export default SignIn;
