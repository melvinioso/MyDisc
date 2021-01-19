import React from 'react';
import { View, Button as UIButton, Colors } from 'react-native-ui-lib';
import { StyleSheet } from 'react-native';

import { PX } from '../../theme';

function Button({
  label,
  btnColor,
  size,
  onPress,
  children,
  outline,
  labelStyle,
  ...viewProps
}) {
  const buttonProps = {
    label,
    btnColor,
    size,
    onPress,
    children,
    outline,
    labelStyle,
  };

  return (
    <View style={styles.container} {...viewProps}>
      <UIButton
        style={[styles.container, outline && styles.outline]}
        color={outline ? btnColor : Colors.white}
        backgroundColor={outline ? Colors.white : btnColor}
        outlineColor={btnColor}
        {...buttonProps}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 70 * PX,
    overflow: 'hidden',
  },
  outline: {
    borderWidth: 4 * PX,
  },
});

export default Button;
