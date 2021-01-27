import React from 'react';
import { View, Text, Colors } from 'react-native-ui-lib';
import { StyleSheet, TextInput } from 'react-native';

function TextField({ style, title, error, ...props }) {
  return (
    <View style={[style]}>
      <Text text80 slate>
        {title}
      </Text>
      <TextInput style={[styles.input]} {...props} />
      {error ? (
        <Text text80 red20 marginT-5 marginL-10>
          {error}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: Colors.smoke,
    marginTop: 8,
    paddingHorizontal: 10,
    paddingVertical: 15,
    fontSize: 20,
    borderRadius: 5,
  },
});

export default TextField;
