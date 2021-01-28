import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { defaultHeaderOptions as headerOptions } from '../../theme';

import Dashboard from '../../screens/Dashboard';

const Stack = createStackNavigator();

function DashboardNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Dashboard"
      headerMode="float"
      screenOptions={headerOptions}
    >
      <Stack.Screen name="Dashboard" component={Dashboard} />
    </Stack.Navigator>
  );
}

export default DashboardNavigator;
