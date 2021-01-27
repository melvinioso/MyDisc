import React, { useEffect, useContext } from 'react';
import { View, Text, Button, Colors } from 'react-native-ui-lib';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import { ActivityIndicator, TouchableOpacity } from 'react-native';

import TextField from '../../components/TextField';

import { ToastContext } from '../../context/toast';

const schema = yup.object().shape({
  email: yup.string().email('Not a valid email').required('Email is required'),
});

function ForgotPassword({ navigation }) {
  const { notify } = useContext(ToastContext);
  const { register, handleSubmit, setValue, errors, formState } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    register('email');
  }, [register]);

  async function onSubmit(values) {
    try {
      const { email } = values;

      const options = {
        email,
      };
      notify({
        title: 'Email:',
        message: options.email,
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
          <View>
            <Text text50BO mint>
              Reset Password
            </Text>
          </View>
          <View marginT-20>
            <View marginT-10>
              <TextField
                title="Email"
                autoCapitalize="none"
                autoCompleteType="email"
                keyboardType="email-address"
                clearButtonMode="while-editing"
                onChangeText={(val) => setValue('email', val)}
                error={errors?.email?.message}
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
                    Send Instructions
                  </Text>
                )}
              </Button>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('SignIn');
                }}
              >
                <Text text70L indigo center marginT-20>
                  Nevermind
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}

export default ForgotPassword;
