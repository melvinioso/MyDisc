import React, { useState, useContext } from 'react';
import { StyleSheet, FlatList, SafeAreaView, Dimensions } from 'react-native';
import { get } from 'lodash';

import { useQuery } from '@apollo/client';
import { QUERY_BAGS } from '../../graphql/queries';

import BagHeader from '../../components/BagHeader';
import Bag from '../../components/Bag';

import { AuthContext } from '../../context/auth';

import { PX } from '../../theme';

const { width } = Dimensions.get('window');
const ITEM_WIDTH = width / 2;
const BAG = ITEM_WIDTH * 0.8;

function MyBags() {
  const { user } = useContext(AuthContext);
  const [bagFilter, setBagFilter] = useState(null);
  const [activeBag, setActiveBag] = useState(null);
  const { data, loading } = useQuery(QUERY_BAGS, {
    variables: { where: { userId: user.id } },
  });

  const bags = get(data, 'bags', []);

  return (
    <SafeAreaView style={styles.container}>
      <BagHeader {...activeBag} />
      <FlatList
        data={bags}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{
          paddingBottom: 500 * PX,
          paddingTop: 60 * PX,
        }}
        renderItem={({ item, index }) => (
          <Bag
            name={item.name}
            color={item.color}
            size={BAG}
            columnWidth={ITEM_WIDTH}
            index={index}
            onPress={() => {
              setActiveBag(item);
            }}
          />
        )}
        numColumns={2}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default MyBags;
