import React from 'react';
import { Colors } from 'react-native-ui-lib';
import { StyleSheet, TextInput as RNTextInput } from 'react-native';

import ErrorMessage from '../../components/ErrorMessage';
import { PX } from '../../theme';

function TextInput({
  style,
  placeholderTextColor = Colors.gray,
  error,
  ...props
}) {
  return (
    <>
      <RNTextInput
        style={[styles.textInput, style]}
        placeholderTextColor={placeholderTextColor}
        {...props}
      />
      {error ? <ErrorMessage message={error.message} /> : null}
    </>
  );
}

const styles = StyleSheet.create({
  textInput: {
    borderWidth: 1,
    borderColor: Colors.gray,
    borderRadius: 70 * PX,
    paddingHorizontal: 10,
    paddingVertical: 12,
  },
});

export default TextInput;
