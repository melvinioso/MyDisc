import React from 'react';
import { TouchableOpacity, Colors } from 'react-native-ui-lib';
import { StyleSheet } from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import { HIT_SLOP } from '../../theme';

function BackButton({ onPress, style, ...props }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.backButton, style]}
      hitSlop={HIT_SLOP}
      {...props}
    >
      <Ionicons name="ios-chevron-back-circle" size={40} color={Colors.mint} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  backButton: {
    width: 40,
    height: 40,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

export default BackButton;
