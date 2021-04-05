import React, { useContext } from 'react';
import { Colors } from 'react-native-ui-lib';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { defaultScreenOptions as screenOptions } from '../../theme';

import { ApolloProvider } from '@apollo/client';

import MyDiscsNavigator from '../MyDiscs';
import MyBagsNavigator from '../MyBags';
import BuildABagNavigator from '../BuildABag';

import Bag from '../../../assets/svgs/bag';

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
        screenOptions={screenOptions}
        tabBarOptions={{
          activeTintColor: Colors.indigo,
          inactiveTintColor: Colors.slate,
          style: {
            height: 380 * PX,
            paddingTop: 16,
          },
          labelStyle: {
            fontSize: 14,
            fontWeight: '600',
          },
        }}
      >
        <Tab.Screen
          name="MyDiscs"
          component={MyDiscsNavigator}
          options={{
            tabBarLabel: 'My Discs',
            tabBarIcon: ({ color }) => (
              <FontAwesome name="circle" size={24} color={color} />
            ),
          }}
        />
        {/* <Tab.Screen
          name="BuildABag"
          component={BuildABagNavigator}
          options={{
            tabBarLabel: 'Build A Bag',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="tools" size={24} color={color} />
            ),
          }}
        /> */}
        <Tab.Screen
          name="MyBags"
          component={MyBagsNavigator}
          options={{
            tabBarLabel: 'My Bags',
            tabBarIcon: ({ color }) => <Bag name="backpack" color={color} />,
          }}
        />
      </Tab.Navigator>
    </ApolloProvider>
  );
}

export default Main;
