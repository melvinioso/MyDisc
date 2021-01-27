import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { defaultScreenOptions as screenOptions } from '../../theme';

import SignIn from '../../screens/SignIn';
import Register from '../../screens/Register';
import ForgotPassword from '../../screens/ForgotPassword';

const Stack = createStackNavigator();

function Auth() {
  return (
    <Stack.Navigator
      initialRouteName="SignIn"
      headerMode="screen"
      screenOptions={screenOptions}
    >
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
    </Stack.Navigator>
  );
}

export default Auth;
