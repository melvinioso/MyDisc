import React from 'react';
import { ImageBackground, StyleSheet } from 'react-native';

function Background({ children, source }) {
  return (
    <ImageBackground style={styles.fullSize} source={source}>
      {children}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  fullSize: {
    width: '100%',
    height: '100%',
  },
});

export default Background;
