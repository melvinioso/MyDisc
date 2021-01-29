import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { defaultHeaderOptions as headerOptions } from '../../theme';

import MyDiscs from '../../screens/MyDiscs';

const Stack = createStackNavigator();

function MyDiscsNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="MyDiscs"
      headerMode="float"
      screenOptions={headerOptions}
    >
      <Stack.Screen name="MyDiscs" component={MyDiscs} />
    </Stack.Navigator>
  );
}

export default MyDiscsNavigator;
