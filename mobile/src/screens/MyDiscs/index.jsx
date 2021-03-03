import React, { useState, useContext } from 'react';
import { StyleSheet, FlatList, SafeAreaView } from 'react-native';
import { View, TabBar, Colors, Text } from 'react-native-ui-lib';
import { get } from 'lodash';

import { useQuery } from '@apollo/client';
import { QUERY_DISCS } from '../../graphql/queries';

import DiscHeader from '../../components/DiscHeader';
import Disc from '../../components/Disc';

import { AuthContext } from '../../context/auth';

function MyDiscs() {
  const { user } = useContext(AuthContext);
  const [speedFilter, setSpeedFilter] = useState(null);
  const [activeDisc, setActiveDisc] = useState(null);
  const { data, loading } = useQuery(QUERY_DISCS, {
    variables: { where: { userId: user.id } },
  });

  const filteredDiscs = get(data, 'discs', []).filter((i) => {
    if (!speedFilter) {
      return true;
    }

    const { min, max } = speedFilter;

    return i.speed >= min && i.speed <= max;
  });

  return (
    <SafeAreaView style={styles.container}>
      <DiscHeader {...activeDisc} />
      <View style={styles.filter}>
        <Text text90M gray borderTop center marginT-5>
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
          labelStyle={styles.labelStyle}
          selectedLabelStyle={{ color: Colors.indigo }}
          showDivider
          onPress={() => setSpeedFilter(null)}
        />
        <TabBar.Item
          label="1-3"
          labelStyle={styles.labelStyle}
          selectedLabelStyle={{ color: Colors.indigo }}
          showDivider
          onPress={() => setSpeedFilter({ min: 1, max: 3 })}
        />
        <TabBar.Item
          label="4-5"
          labelStyle={styles.labelStyle}
          selectedLabelStyle={{ color: Colors.indigo }}
          showDivider
          onPress={() => setSpeedFilter({ min: 4, max: 5 })}
        />
        <TabBar.Item
          label="6-8"
          labelStyle={styles.labelStyle}
          selectedLabelStyle={{ color: Colors.indigo }}
          showDivider
          onPress={() => setSpeedFilter({ min: 6, max: 8 })}
        />
        <TabBar.Item
          label="9-14"
          labelStyle={styles.labelStyle}
          selectedLabelStyle={{ color: Colors.indigo }}
          onPress={() => setSpeedFilter({ min: 9, max: 14 })}
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
  filter: {
    backgroundColor: Colors.white,
  },
  labelStyle: {
    color: Colors.gray,
    fontWeight: '600',
  },
});

export default MyDiscs;
