import React from 'react';
import { StyleSheet } from 'react-native';
import { View, Text, Colors } from 'react-native-ui-lib';

import Disc from '../../components/Disc';

function Dashboard() {
  return (
    <View style={styles.container}>
      <Disc size={80} color={Colors.mint} brand="Discraft" mold="Buzzz" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Dashboard;
