import React from 'react';
import { View, Text, Colors } from 'react-native-ui-lib';

function ErrorMessage({ message }) {
  return (
    <View marginT-10 marginL-10>
      <Text color={Colors.red}>{message}</Text>
    </View>
  );
}

export default ErrorMessage;
