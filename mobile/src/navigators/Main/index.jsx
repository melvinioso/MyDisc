import React, { useContext } from 'react';
import { Colors } from 'react-native-ui-lib';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { FontAwesome } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';

import { defaultHeaderOptions as headerOptions } from '../../theme';

import { ApolloProvider } from '@apollo/client';

import DashboardNavigator from '../Dashboard';
import AddDiscNavigator from '../AddDisc';

import { AuthContext } from '../../context/auth';

const Tab = createMaterialBottomTabNavigator();

function Main() {
  const { token, client } = useContext(AuthContext);

  if (!token || !client) {
    return null;
  }

  return (
    <ApolloProvider client={client}>
      <Tab.Navigator
        initialRouteName="Dashboard"
        headerMode="float"
        screenOptions={headerOptions}
        activeColor={Colors.indigo}
        inactiveColor={Colors.gray}
        barStyle={{ backgroundColor: `${Colors.white}` }}
      >
        <Tab.Screen
          name="Dashboard"
          component={DashboardNavigator}
          options={{
            tabBarLabel: 'My Discs',
            tabBarIcon: ({ color }) => (
              <SimpleLineIcons name="disc" size={24} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="AddDisc"
          component={AddDiscNavigator}
          options={{
            tabBarLabel: 'Add a Disc',
            tabBarIcon: ({ color }) => (
              <FontAwesome name="plus" size={24} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    </ApolloProvider>
  );
}

export default Main;
