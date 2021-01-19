import React from 'react';
import { View, Colors } from 'react-native-ui-lib';
import { ActivityIndicator, StyleSheet } from 'react-native';

function Loading() {
  return (
    <View useSafeArea flex center>
      <ActivityIndicator
        size="large"
        color={Colors.blue}
        style={[styles.indicator]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  indicator: {
    opacity: 0.3,
  },
});

export default Loading;
