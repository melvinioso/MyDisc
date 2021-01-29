import React from 'react';
import { StyleSheet } from 'react-native';
import { View, Text, Colors } from 'react-native-ui-lib';

import { useQuery } from '@apollo/client';
// import { QUERY_DISCS } from '../../graphql/queries';

import BagHeader from '../../components/BagHeader';

function MyBags() {
  // const { data, loading } = useQuery(QUERY_DISCS);

  // const getData = async () => {
  //   try {
  //     await data;
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  // getData();

  // console.log("DATA: ", data);

  return (
    <View style={{ width: '100%' }}>
      <View>
        <BagHeader
          name="Falcon Pointe"
          capacity={18}
          color={Colors.mint}
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
