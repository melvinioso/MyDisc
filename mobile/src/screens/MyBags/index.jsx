import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, FlatList, SafeAreaView } from 'react-native';
import { View } from 'react-native-ui-lib';

import { useQuery } from '@apollo/client';
import { QUERY_BAGS } from '../../graphql/queries';

import BagHeader from '../../components/BagHeader';
import Bag from '../../components/Bag';

import { AuthContext } from '../../context/auth';

function MyBags() {
  const { user } = useContext(AuthContext);
  const [bags, setBags] = useState(undefined);
  const [activeBag, setActiveBag] = useState(null);
  const { data, loading } = useQuery(QUERY_BAGS, {
    variables: { where: { userId: user.id } },
  });

  useEffect(() => {
    const allBags = data?.bags || [];
    if (!allBags || !allBags.length) {
      return;
    }

    setBags(allBags);
  }, [data, loading]);

  if (!data?.bags) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <BagHeader {...activeBag} />
      <FlatList
        data={bags}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{
          paddingBottom: 100,
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