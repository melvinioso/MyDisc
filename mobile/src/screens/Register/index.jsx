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
  const { notify } = useContext(ToastContext);
  const { createAccount } = useContext(AuthContext);
  const { register, handleSubmit, setValue, errors, formState } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    register('name');
    register('providerId');
    register('providerKey');
    register('confirm');
  }, [register]);

  async function onSubmit(values) {
    try {
      await createAccount({
        name: values.name,
        providerId: values.providerId,
        providerKey: values.providerKey,
      });
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
            New Account
          </Text>

          <View marginT-20>
            <View marginT-10>
              <TextField
                title="Name"
                autoCapitalize="words"
                autoCompleteType="name"
                clearButtonMode="while-editing"
                onChangeText={(val) => setValue('name', val)}
                error={errors?.name?.message}
              />
            </View>

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
            <View marginT-10>
              <TextField
                title="Confirm Password"
                secureTextEntry
                onChangeText={(val) => setValue('confirm', val)}
                error={errors?.confirm?.message}
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
                    Create Account
                  </Text>
                )}
              </Button>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('SignIn');
                }}
              >
                <Text text70L indigo center marginT-20>
                  I already have an account
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}

export default CreateAccount;
