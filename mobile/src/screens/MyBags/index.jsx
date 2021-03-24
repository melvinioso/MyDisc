import React, { useState, useContext } from 'react';
import { StyleSheet, FlatList, SafeAreaView } from 'react-native';
import { View, Colors, Text } from 'react-native-ui-lib';
import { get } from 'lodash';
import { darken } from 'polished';

import { useQuery } from '@apollo/client';
import { QUERY_BAGS } from '../../graphql/queries';

import BagHeader from '../../components/BagHeader';
import Bag from '../../components/Bag';

import { AuthContext } from '../../context/auth';

import { PX } from '../../theme';

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

export default MyBags;
