import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, FlatList, SafeAreaView } from 'react-native';
import { View, TabBar, Colors, Text } from 'react-native-ui-lib';

import { useQuery } from '@apollo/client';
import { QUERY_DISCS } from '../../graphql/queries';

import DiscHeader from '../../components/DiscHeader';
import Disc from '../../components/Disc';

import { AuthContext } from '../../context/auth';

function MyDiscs() {
  const { user } = useContext(AuthContext);
  const [discs, setDiscs] = useState(undefined);
  const [filteredDiscs, setFilteredDiscs] = useState(undefined);
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
    setFilteredDiscs(allDiscs);
  }, [data, loading]);

  if (!data?.discs) {
    return null;
  }

  function filterDiscs(key) {
    const temp = discs;

    if (key === 'all') {
      setFilteredDiscs(temp);
      return;
    }

    const storage = temp.filter((item) => {
      if (key === 'putters') {
        return item.speed >= 1 && item.speed <= 3;
      } else if (key === 'mids') {
        return item.speed >= 4 && item.speed <= 5;
      } else if (key === 'fairways') {
        return item.speed >= 6 && item.speed <= 8;
      } else if (key === 'distance') {
        return item.speed >= 9 && item.speed <= 14;
      }
    });
    setFilteredDiscs(storage);
  }

  return (
    <SafeAreaView style={styles.container}>
      <DiscHeader {...activeDisc} />
      <View style={{ backgroundColor: Colors.white }}>
        <Text text90M gray center marginT-5>
          Filter by Speed:
        </Text>
      </View>
      <TabBar
        style={styles.tabbar}
        selectedIndex={0}
        enableShadow
        indicatorStyle={{ backgroundColor: Colors.indigo }}
      >
        <TabBar.Item
          label="All"
          labelStyle={{ color: Colors.gray, fontWeight: '600' }}
          selectedLabelStyle={{ color: Colors.indigo }}
          showDivider
          onPress={() => filterDiscs('all')}
        />
        <TabBar.Item
          label="1-3"
          labelStyle={{ color: Colors.gray, fontWeight: '600' }}
          selectedLabelStyle={{ color: Colors.indigo }}
          showDivider
          onPress={() => filterDiscs('putters')}
        />
        <TabBar.Item
          label="4-5"
          labelStyle={{ color: Colors.gray, fontWeight: '600' }}
          selectedLabelStyle={{ color: Colors.indigo }}
          showDivider
          onPress={() => filterDiscs('mids')}
        />
        <TabBar.Item
          label="6-8"
          labelStyle={{ color: Colors.gray, fontWeight: '600' }}
          selectedLabelStyle={{ color: Colors.indigo }}
          showDivider
          onPress={() => filterDiscs('fairways')}
        />
        <TabBar.Item
          label="9-14"
          labelStyle={{ color: Colors.gray, fontWeight: '600' }}
          selectedLabelStyle={{ color: Colors.indigo }}
          onPress={() => filterDiscs('distance')}
        />
      </TabBar>
      <FlatList
        data={filteredDiscs}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{
          paddingBottom: 100,
          paddingTop: 10,
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
  tabbar: {},
});

export default MyDiscs;
