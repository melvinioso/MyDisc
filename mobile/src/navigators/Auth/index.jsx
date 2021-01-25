import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { defaultScreenOptions as screenOptions } from '../../theme';

import Welcome from '../../screens/Welcome';
import SignIn from '../../screens/SignIn';
import Register from '../../screens/Register';
import ForgotPassword from '../../screens/ForgotPassword';
import EmailSent from '../../screens/EmailSent';

const Stack = createStackNavigator();

function WelcomeNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Welcome"
      headerMode="screen"
      screenOptions={screenOptions}
    >
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="EmailSent" component={EmailSent} />
    </Stack.Navigator>
  );
}

export default WelcomeNavigator;
