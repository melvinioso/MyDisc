import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { defaultScreenOptions as screenOptions } from '../../theme';

import Welcome from '../../screens/Welcome';

const Stack = createStackNavigator();

function WelcomeNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Welcome"
      headerMode="screen"
      screenOptions={screenOptions}
    >
      <Stack.Screen name="Welcome" component={Welcome} />
    </Stack.Navigator>
  );
}

export default WelcomeNavigator;
