import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import * as Animatable from 'react-native-animatable';
import { Colors } from 'react-native-ui-lib';

import BuildABag from '../../screens/BuildABag';
import SettingsButton from '../../components/SettingsButton';

const Stack = createStackNavigator();

function BuildABagNavigator() {
  return (
    <Stack.Navigator initialRouteName="BuildABag">
      <Stack.Screen
        name="Build A Bag"
        component={BuildABag}
        options={{
          headerShown: true,
          headerTitle: 'Build A Bag',
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
        }}
      />
    </Stack.Navigator>
  );
}

export default BuildABagNavigator;
