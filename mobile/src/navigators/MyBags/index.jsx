import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import * as Animatable from 'react-native-animatable';
import { Colors } from 'react-native-ui-lib';

import MyBags from '../../screens/MyBags';
import SettingsButton from '../../components/SettingsButton';
import AddButton from '../../components/AddButton';

const Stack = createStackNavigator();

function MyBagsNavigator() {
  return (
    <Stack.Navigator initialRouteName="MyBags">
      <Stack.Screen
        name="My Bags"
        component={MyBags}
        options={{
          headerShown: true,
          headerTitle: 'My Bags',
          headerTitleStyle: {
            color: Colors.white,
          },
          headerStyle: {
            backgroundColor: Colors.slate,
          },
          headerLeft: () => (
            <Animatable.View
              animation="fadeIn"
              duration={300}
              style={{ position: 'absolute', top: 10, left: 20, zIndex: 9999 }}
            >
              <SettingsButton />
            </Animatable.View>
          ),
          headerRight: () => (
            <Animatable.View
              animation="fadeIn"
              duration={300}
              style={{ position: 'absolute', top: 10, right: 20, zIndex: 9999 }}
            >
              <AddButton mode={'bag'} />
            </Animatable.View>
          ),
        }}
      />
    </Stack.Navigator>
  );
}

export default MyBagsNavigator;
