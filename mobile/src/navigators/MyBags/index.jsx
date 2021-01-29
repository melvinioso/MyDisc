import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { defaultHeaderOptions as headerOptions } from '../../theme';

import MyBags from '../../screens/MyBags';

const Stack = createStackNavigator();

function MyBagsNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="MyBags"
      headerMode="float"
      screenOptions={headerOptions}
    >
      <Stack.Screen name="MyBags" component={MyBags} />
    </Stack.Navigator>
  );
}

export default MyBagsNavigator;
