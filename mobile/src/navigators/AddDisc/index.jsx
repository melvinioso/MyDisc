import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { defaultHeaderOptions as headerOptions } from '../../theme';

import AddDisc from '../../screens/AddDisc';

const Stack = createStackNavigator();

function AddDiscNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="AddDisc"
      headerMode="float"
      screenOptions={headerOptions}
    >
      <Stack.Screen name="AddDisc" component={AddDisc} />
    </Stack.Navigator>
  );
}

export default AddDiscNavigator;
