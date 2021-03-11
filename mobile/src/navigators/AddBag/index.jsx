import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import * as Animatable from 'react-native-animatable';
import { Colors } from 'react-native-ui-lib';

import AddBag from '../../screens/AddBag';
import SettingsButton from '../../components/SettingsButton';

const Stack = createStackNavigator();

function AddBagNavigator() {
  return (
    <Stack.Navigator initialRouteName="AddBag">
      <Stack.Screen
        name="Add A Bag"
        component={AddBag}
        options={{
          headerShown: true,
          headerTitle: 'Add A Bag',
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

export default AddBagNavigator;
