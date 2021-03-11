import React, { useContext } from 'react';
import { Colors } from 'react-native-ui-lib';
import { TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useActionSheet } from '@expo/react-native-action-sheet';

import { AuthContext } from '../../context/auth';

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
      hitSlop={{
        top: 10,
        right: 10,
        bottom: 10,
        left: 10,
      }}
    >
      <MaterialIcons name="settings" size={28} color={Colors.indigo} />
    </TouchableOpacity>
  );
}

export default SettingsButton;
