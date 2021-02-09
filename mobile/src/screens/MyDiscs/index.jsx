import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, FlatList, SafeAreaView } from 'react-native';
import { View, Text, Colors } from 'react-native-ui-lib';

import { useQuery } from '@apollo/client';
import { QUERY_DISCS } from '../../graphql/queries';

import DiscHeader from '../../components/DiscHeader';
import Disc from '../../components/Disc';

import { AuthContext } from '../../context/auth';

function MyDiscs() {
  const { user } = useContext(AuthContext);
  const [discs, setDiscs] = useState(undefined);
  const [activeDisc, setActiveDisc] = useState(null);
  const { data, loading } = useQuery(QUERY_DISCS, {
    variables: { where: { userId: user.id } },
  });

  useEffect(() => {
    const allDiscs = data?.discs || [];
    if (!allDiscs || !allDiscs.length) {
      return;
    }

    setDiscs(allDiscs);
  }, [data, loading]);

  if (!data?.discs) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <DiscHeader {...activeDisc} />
      <FlatList
        data={discs}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{
          paddingBottom: 100,
        }}
        renderItem={({ item, index }) => (
          <View>
            <Disc
              color={item.color}
              brand={item.brand}
              mold={item.mold}
              index={index}
              onPress={() => {
                setActiveDisc(item);
              }}
            />
          </View>
        )}
        numColumns={4}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default MyDiscs;
