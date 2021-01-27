import React from 'react';
import { View, Colors } from 'react-native-ui-lib';
import { ActivityIndicator, StyleSheet } from 'react-native';

function Loading({ visible }) {
  if (!visible) {
    return null;
  }

  return (
    <View flex center style={[styles.loading]}>
      <ActivityIndicator color={Colors.blue30} />
    </View>
  );
}

const styles = StyleSheet.create({
  loading: {
    backgroundColor: Colors.white,
    ...StyleSheet.absoluteFillObject,
  },
});

export default Loading;
