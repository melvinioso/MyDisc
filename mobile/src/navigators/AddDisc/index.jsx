import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import * as Animatable from 'react-native-animatable';
import { Colors } from 'react-native-ui-lib';

import AddDisc from '../../screens/AddDisc';
import SettingsButton from '../../components/SettingsButton';

const Stack = createStackNavigator();

function AddDiscNavigator() {
  return (
    <Stack.Navigator initialRouteName="AddDisc">
      <Stack.Screen
        name="Add A Disc"
        component={AddDisc}
        options={{
          headerShown: true,
          headerTitle: 'Add A Disc',
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

export default AddDiscNavigator;
