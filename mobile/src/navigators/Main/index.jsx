import React from 'react';
import { Colors } from 'react-native-ui-lib';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Welcome from '../Welcome';

const Drawer = createDrawerNavigator();

const drawerContentOptions = {
  activeTintColor: Colors.blue,
};

function Main() {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContentOptions={drawerContentOptions}
      hideStatusBar
      lazy={false}
      // DO NOT REMOVE --- FOR REAL
      sceneContainerStyle={{ backgroundColor: 'transparent' }}
    >
      <Drawer.Screen name="Welcome" component={Welcome} />
    </Drawer.Navigator>
  );
}

export default Main;
