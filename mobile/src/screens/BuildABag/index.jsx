import React, { useState, useContext } from 'react';
import { StyleSheet, FlatList, SafeAreaView } from 'react-native';
import { View } from 'react-native-ui-lib';
import { get } from 'lodash';

import { useQuery } from '@apollo/client';
import { QUERY_BAGS } from '../../graphql/queries';

import BuildHeader from '../../components/BuildHeader';
import Bag from '../../components/Bag';

import { AuthContext } from '../../context/auth';

import { PX } from '../../theme';

function BuildABag() {
  const { user } = useContext(AuthContext);
  const [bagFilter, setBagFilter] = useState(null);
  const [activeBag, setActiveBag] = useState(null);
  const { data, loading } = useQuery(QUERY_BAGS, {
    variables: { where: { userId: user.id } },
  });

  const filteredBags = get(data, 'bags', []).filter((i) => {
    if (!bagFilter) {
      return true;
    }

    // const { min, max } = speedFilter;

    // return i.speed >= min && i.speed <= max;
  });

  return (
    <SafeAreaView style={styles.container}>
      <BuildHeader data={filteredBags} />
      <FlatList
        data={filteredBags}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{
          paddingBottom: 500 * PX,
          paddingTop: 60 * PX,
        }}
        renderItem={({ item, index }) => (
          <View>
            <Bag
              name={item.name}
              color={item.color}
              index={index}
              onPress={() => {
                setActiveBag(item);
              }}
            />
          </View>
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

export default BuildABag;
