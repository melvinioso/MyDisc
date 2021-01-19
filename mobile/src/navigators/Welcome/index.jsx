import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { defaultScreenOptions as screenOptions } from '../../theme';

import Welcome from '../../screens/Welcome';

const Stack = createStackNavigator();

function WelcomeNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Welcome flow"
      headerMode="screen"
      screenOptions={screenOptions}
    >
      <Stack.Screen name="Welcome flow" component={Welcome} />
    </Stack.Navigator>
  );
}

export default WelcomeNavigator;
