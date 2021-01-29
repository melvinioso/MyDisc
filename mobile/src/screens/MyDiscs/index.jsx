import React from 'react';
import { StyleSheet } from 'react-native';
import { View, Text, Colors } from 'react-native-ui-lib';

import { useQuery } from '@apollo/client';
import { QUERY_DISCS } from '../../graphql/queries';

import DiscHeader from '../../components/DiscHeader';
import Disc from '../../components/Disc';

function MyDiscs() {
  const { data, loading } = useQuery(QUERY_DISCS);

  const getData = async () => {
    try {
      await data;
    } catch (e) {
      console.log(e);
    }
  };

  getData();

  console.log('DATA: ', data);

  return (
    <View style={{ width: '100%' }}>
      <DiscHeader
        color={Colors.blue}
        brand="Discraft"
        mold="Buzzz"
        plastic="Big Z"
        weight={168}
        speed={5}
        glide={4}
        turn={-1}
        fade={1}
      />
    </View>
  );
}

const styles = StyleSheet.create({});

export default MyDiscs;
