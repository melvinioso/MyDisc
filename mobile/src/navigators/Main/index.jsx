import React, { useContext } from 'react';
import { Colors } from 'react-native-ui-lib';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';

import { ApolloProvider } from '@apollo/client';

import Home from '../Home';

import { AuthContext } from '../../context/auth';

const Drawer = createDrawerNavigator();

const drawerContentOptions = {
  activeTintColor: Colors.blue,
};

function CustomDrawerContent(props) {
  const { logout } = useContext(AuthContext);

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Sign Out"
        onPress={async () => {
          await logout();
        }}
      />
    </DrawerContentScrollView>
  );
}

function Main() {
  const { token, client } = useContext(AuthContext);

  if (!token || !client) {
    return null;
  }

  return (
    <ApolloProvider client={client}>
      <Drawer.Navigator
        initialRouteName="Home"
        drawerContentOptions={drawerContentOptions}
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        hideStatusBar
        lazy={false}
        // DO NOT REMOVE --- FOR REAL
        sceneContainerStyle={{ backgroundColor: 'transparent' }}
      >
        <Drawer.Screen name="Home" component={Home} />
      </Drawer.Navigator>
    </ApolloProvider>
  );
}

export default Main;
