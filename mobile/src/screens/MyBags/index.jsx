import React, { useContext } from 'react';
import { StyleSheet, FlatList, SafeAreaView, Dimensions } from 'react-native';
import { View, Colors } from 'react-native-ui-lib';
import { get } from 'lodash';

import { useQuery } from '@apollo/client';
import { useMutation } from '@apollo/client';
import { QUERY_BAGS } from '../../graphql/queries';
import { DESTROY_BAG } from '../../graphql/mutations';

import Bag from '../../components/Bag';
import SwipeableRow from '../../components/SwipeableRow';

import { AuthContext } from '../../context/auth';

import { PX } from '../../theme';

const { width } = Dimensions.get('window');

function MyBags() {
  const { user } = useContext(AuthContext);
  const [destroyBag] = useMutation(DESTROY_BAG);
  const { data, loading } = useQuery(QUERY_BAGS, {
    variables: { where: { userId: user.id } },
  });

  const bags = get(data, 'bags', []);

  async function deleteItem(item) {
    try {
      await destroyBag({
        variables: {
          bag: {
            id: item.id,
          },
        },
        refetchQueries: [
          {
            query: QUERY_BAGS,
            variables: { where: { userId: user.id } },
          },
        ],
        awaitRefetchQueries: true,
      });
    } catch (e) {
      console.log(e);
    }
  }

  const BagRow = ({ item, index }) => {
    return (
      <SwipeableRow
        handleDelete={() => deleteItem(item)}
        handleEdit={() => editItem(item)}
        handleAddDisc={() => addItem(item)}
      >
        <Bag {...item} index={index} />
      </SwipeableRow>
    );
  };

  const ITEM_SEPARATOR = () => {
    return (
      <View
        style={{ height: 0.5, backgroundColor: Colors.slate, width: width }}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={bags}
        keyExtractor={(item) => item.id.toString()}
        ItemSeparatorComponent={ITEM_SEPARATOR}
        contentContainerStyle={{
          paddingBottom: 500 * PX,
        }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => <BagRow item={item} index={index} />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
});

export default MyBags;
