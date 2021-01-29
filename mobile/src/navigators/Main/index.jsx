import React, { useContext } from 'react';
import { Colors } from 'react-native-ui-lib';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';

import { defaultHeaderOptions as headerOptions } from '../../theme';

import { ApolloProvider } from '@apollo/client';

import MyDiscsNavigator from '../MyDiscs';
import MyBagsNavigator from '../MyBags';

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
        initialRouteName="MyDiscs"
        headerMode="float"
        screenOptions={headerOptions}
        activeColor={Colors.indigo}
        inactiveColor={Colors.gray}
        barStyle={{ backgroundColor: `${Colors.white}` }}
      >
        <Tab.Screen
          name="MyDiscs"
          component={MyDiscsNavigator}
          options={{
            tabBarLabel: 'My Discs',
            tabBarIcon: ({ color }) => (
              <SimpleLineIcons name="disc" size={24} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="AddBag"
          component={MyBagsNavigator}
          options={{
            tabBarLabel: 'My Bags',
            tabBarIcon: ({ color }) => (
              <MaterialIcons name="backpack" size={24} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    </ApolloProvider>
  );
}

export default Main;
