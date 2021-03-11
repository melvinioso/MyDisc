import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import * as Animatable from 'react-native-animatable';
import { Colors } from 'react-native-ui-lib';

import MyDiscs from '../../screens/MyDiscs';
import SettingsButton from '../../components/SettingsButton';

const Stack = createStackNavigator();

function MyDiscsNavigator() {
  return (
    <Stack.Navigator initialRouteName="MyDiscs">
      <Stack.Screen
        name="My Discs"
        component={MyDiscs}
        options={{
          headerShown: true,
          headerTitle: 'My Discs',
          headerTitleStyle: {
            color: Colors.indigo,
          },
          headerRight: () => (
            <Animatable.View
              animation="fadeIn"
              duration={300}
              style={{ position: 'absolute', top: 10, right: 20, zIndex: 9999 }}
            >
              <SettingsButton />
            </Animatable.View>
          ),
        }}
      />
    </Stack.Navigator>
  );
}

export default MyDiscsNavigator;
