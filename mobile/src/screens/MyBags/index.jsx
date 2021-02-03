import React from 'react';
import { StyleSheet } from 'react-native';
import { View, Text, Colors } from 'react-native-ui-lib';

import { useQuery } from '@apollo/client';
import { QUERY_BAGS } from '../../graphql/queries';

import BagHeader from '../../components/BagHeader';

function MyBags() {
  const { data, loading } = useQuery(QUERY_BAGS);

  const getData = async () => {
    try {
      await data;
    } catch (e) {
      console.log(e);
    }
  };

  getData();

  console.log('BAGS: ', data);

  return (
    <View style={{ width: '100%' }}>
      <View>
        <BagHeader
          name="Falcon Pointe"
          capacity={18}
          color={Colors.indigo}
          putters={6}
          midranges={4}
          fairways={3}
          distance={3}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});

export default MyBags;
