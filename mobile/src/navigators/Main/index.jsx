import React, { useContext } from 'react';
import { Colors } from 'react-native-ui-lib';
import * as Animatable from 'react-native-animatable';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useActionSheet } from '@expo/react-native-action-sheet';

import { defaultScreenOptions as screenOptions } from '../../theme';

import { ApolloProvider } from '@apollo/client';

import Dashboard from '../../screens/Dashboard';
import AddDisc from '../../screens/AddDisc';

import { AuthContext } from '../../context/auth';

const Stack = createStackNavigator();

function SettingsButton() {
  const { logout } = useContext(AuthContext);
  const { showActionSheetWithOptions } = useActionSheet();

  return (
    <TouchableOpacity
      onPress={() => {
        showActionSheetWithOptions(
          {
            options: ['Sign Out', 'Cancel'],
            cancelButtonIndex: 1,
          },
          async (buttonIndex) => {
            if (buttonIndex === 0) {
              logout();
              return;
            }
          }
        );
      }}
    >
      <MaterialIcons name="settings" size={28} color={Colors.smoke} />
    </TouchableOpacity>
  );
}

function Main() {
  const { token, client } = useContext(AuthContext);

  if (!token || !client) {
    return null;
  }

  return (
    <ApolloProvider client={client}>
      <Stack.Navigator
        initialRouteName="Dashboard"
        headerMode="screen"
        screenOptions={screenOptions}
      >
        <Stack.Screen
          name="Dashboard"
          component={Dashboard}
          options={{
            headerShown: true,
            headerTitle: '',
            headerRight: () => (
              <Animatable.View
                animation="fadeIn"
                duration={300}
                style={{
                  position: 'absolute',
                  top: 10,
                  right: 20,
                  zIndex: 9999,
                }}
              >
                <SettingsButton />
              </Animatable.View>
            ),
          }}
        />
        <Stack.Screen name="AddDisc" component={AddDisc} />
      </Stack.Navigator>
    </ApolloProvider>
  );
}

export default Main;
