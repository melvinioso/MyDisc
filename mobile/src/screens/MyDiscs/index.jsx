import React, { useState, useContext } from 'react';
import { StyleSheet, FlatList, SafeAreaView } from 'react-native';
import { View, TabBar, Colors, Text } from 'react-native-ui-lib';
import { get } from 'lodash';
import { darken } from 'polished';
import { useHeaderHeight } from '@react-navigation/stack';

import { useQuery } from '@apollo/client';
import { useMutation } from '@apollo/client';
import { DESTROY_DISC } from '../../graphql/mutations';
import { QUERY_DISCS } from '../../graphql/queries';

import EditDisc from '../EditDisc';
import Disc from '../../components/Disc';
import SwipeableRow from '../../components/SwipeableRow';

import { AuthContext } from '../../context/auth';

import { PX } from '../../theme';

function MyDiscs() {
  const { user } = useContext(AuthContext);
  const [speedFilter, setSpeedFilter] = useState(null);
  const [activeDisc, setActiveDisc] = useState(null);
  const [visible, setVisible] = useState(false);
  const [destroyDisc] = useMutation(DESTROY_DISC);
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

  const borderColor = darken(0.1, Colors.white);

  const headerHeight = useHeaderHeight();

  function close() {
    setVisible(false);
  }

  async function deleteItem(item) {
    try {
      await destroyDisc({
        variables: {
          disc: {
            id: item.id,
          },
        },
        refetchQueries: [
          {
            query: QUERY_DISCS,
            variables: { where: { userId: user.id } },
          },
        ],
        awaitRefetchQueries: true,
      });
    } catch (e) {
      console.log(e);
    }
  }

  function editItem(item) {
    setActiveDisc(item);
    console.log(activeDisc?.id);
    setVisible(true);
  }

  const DiscRow = ({ item, index }) => {
    return (
      <SwipeableRow
        handleDelete={() => deleteItem(item)}
        handleEdit={() => editItem(item)}
      >
        <Disc {...item} index={index} />
      </SwipeableRow>
    );
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={[styles.filter, { borderTopColor: borderColor }]}>
          <Text text90M gray borderTop center marginT-5>
            Filter by Speed:
          </Text>
        </View>
        <TabBar
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
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{
            paddingBottom: 500 * PX,
          }}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <DiscRow item={item} index={index} />
          )}
        />
      </SafeAreaView>
      <EditDisc visible={visible} close={close} item={activeDisc} />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  filter: {
    backgroundColor: Colors.white,
  },
  labelStyle: {
    color: Colors.gray,
    fontWeight: '600',
  },
});

export default MyDiscs;
