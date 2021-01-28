import React from 'react';
import { StyleSheet } from 'react-native';
import { View, Text, Colors } from 'react-native-ui-lib';

import Disc from '../../components/Disc';

function Dashboard() {
  return (
    <View style={{ width: '100%' }}>
      <View>
        <Disc
          marginT-50
          marginL-20
          size={80}
          color={Colors.mint}
          brand="Discraft"
          mold="Buzzz"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});

export default Dashboard;
