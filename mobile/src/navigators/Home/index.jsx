import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { defaultScreenOptions as screenOptions } from '../../theme';

import Home from '../../screens/Home';

const Stack = createStackNavigator();

function HomeNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Home flow"
      headerMode="screen"
      screenOptions={screenOptions}
    >
      <Stack.Screen name="Home flow" component={Home} />
    </Stack.Navigator>
  );
}

export default HomeNavigator;
