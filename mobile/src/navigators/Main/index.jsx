import React, { useContext } from 'react';
import { Colors } from 'react-native-ui-lib';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';

import { defaultHeaderOptions as headerOptions } from '../../theme';

import { ApolloProvider } from '@apollo/client';

import MyDiscsNavigator from '../MyDiscs';
import MyBagsNavigator from '../MyBags';
import AddDiscNavigator from '../AddDisc';

import { PX } from '../../theme';

import { AuthContext } from '../../context/auth';

const Tab = createBottomTabNavigator();

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
        tabBarOptions={{
          activeTintColor: `${Colors.indigo}`,
          inactiveTintColor: `${Colors.gray}`,
          style: {
            height: 340 * PX,
          },
          labelStyle: {
            fontSize: 12,
            fontWeight: '600',
          },
        }}
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
          name="AddDisc"
          component={AddDiscNavigator}
          options={{
            tabBarLabel: 'Add Disc',
            tabBarIcon: ({ color }) => (
              <FontAwesome5 name="plus" size={24} color={color} />
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
