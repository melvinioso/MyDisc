import React, { useState, useContext } from 'react';
import {
  StyleSheet,
  FlatList,
  SafeAreaView,
  Dimensions,
  Platform,
} from 'react-native';
import { View, TabBar, Colors, Text } from 'react-native-ui-lib';
import { get } from 'lodash';
import { darken } from 'polished';
import DropDownPicker from 'react-native-dropdown-picker';
import BagSvg from '../../../assets/svgs/bag';

import { useQuery } from '@apollo/client';
import { useMutation } from '@apollo/client';
import { DESTROY_DISC, ADD_DISC_TO_BAG } from '../../graphql/mutations';
import { QUERY_DISCS, QUERY_BAGS } from '../../graphql/queries';

import EditDisc from '../EditDisc';
import Disc from '../../components/Disc';
import SwipeableRow from '../../components/SwipeableRow';

import { AuthContext } from '../../context/auth';

import { PX } from '../../theme';

const { width } = Dimensions.get('window');
const HEIGHT = width / 4;
const LINE_HEIGHT = HEIGHT;

function MyDiscs() {
  const { user } = useContext(AuthContext);
  const [speedFilter, setSpeedFilter] = useState(null);
  const [activeDisc, setActiveDisc] = useState(null);
  const [activeBag, setActiveBag] = useState(null);
  const [visible, setVisible] = useState(false);
  const [destroyDisc] = useMutation(DESTROY_DISC);
  const [addDiscToBag] = useMutation(ADD_DISC_TO_BAG);
  const { data: discsData } = useQuery(QUERY_DISCS, {
    variables: { where: { userId: user?.id } },
  });
  const { data: bagData } = useQuery(QUERY_BAGS, {
    variables: { where: { userId: user?.id } },
  });

  const filteredDiscs = get(discsData, 'discs', []).filter((i) => {
    if (!speedFilter) {
      return true;
    }

    return i.type === speedFilter;
  });

  const bags = get(bagData, 'bags', []);

  const borderColor = darken(0.1, Colors.white);

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

  async function addItem(item) {
    if (!activeBag) return;

    try {
      await addDiscToBag({
        variables: {
          discId: item.id,
          bagId: activeBag.id,
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

  function editItem(item) {
    setActiveDisc(item);
    setVisible(true);
  }

  const ITEM_SEPARATOR = () => {
    return (
      <View
        style={{ height: 0.5, backgroundColor: Colors.slate, width: width }}
      />
    );
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        <View
          row
          centerV
          margin-14
          style={{
            height: LINE_HEIGHT,
            ...(Platform.OS !== 'android' && {
              zIndex: 1111,
            }),
          }}
        >
          <DropDownPicker
            items={bags.map((bag, index) => {
              return {
                label: bag.name,
                value: bag,
                icon: () => (
                  <View style={[{ height: 20 }, { width: 20 }]}>
                    <BagSvg color={bag.color} />
                  </View>
                ),
              };
            })}
            style={{ backgroundColor: '#fafafa' }}
            containerStyle={{ height: 50, width: width * 0.55 }}
            placeholder="Select a bag"
            placeholderStyle={{
              fontWeight: 'bold',
              textAlign: 'center',
            }}
            dropDownMaxHeight={'100%'}
            dropDownStyle={{ backgroundColor: '#fafafa' }}
            labelStyle={{
              fontSize: 14,
              fontWeight: '500',
              color: '#000',
            }}
            selectedLabelStyle={{
              fontSize: 15,
              fontWeight: '600',
              color: Colors.indigo,
            }}
            onChangeItem={(item) => {
              setActiveBag(item.value);
            }}
          />
          <View center marginL-10>
            <Text text80R>Discs:</Text>
          </View>
          <View center marginL-10>
            {activeBag ? (
              <Text indigo text60BO>
                {activeBag?.discs.length} / {activeBag?.capacity}
              </Text>
            ) : null}
          </View>
        </View>
        <View style={[styles.filter, { borderTopColor: borderColor }]}>
          <Text text90M gray borderTop center>
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
            onPress={() => setSpeedFilter('Putter')}
          />
          <TabBar.Item
            label="4-5"
            labelStyle={styles.labelStyle}
            selectedLabelStyle={{ color: Colors.indigo }}
            showDivider
            onPress={() => setSpeedFilter('Midrange')}
          />
          <TabBar.Item
            label="6-8"
            labelStyle={styles.labelStyle}
            selectedLabelStyle={{ color: Colors.indigo }}
            showDivider
            onPress={() => setSpeedFilter('Fairway')}
          />
          <TabBar.Item
            label="9-14"
            labelStyle={styles.labelStyle}
            selectedLabelStyle={{ color: Colors.indigo }}
            onPress={() => setSpeedFilter('Distance')}
          />
        </TabBar>
        <FlatList
          data={filteredDiscs}
          keyExtractor={(item) => item.id.toString()}
          ItemSeparatorComponent={ITEM_SEPARATOR}
          contentContainerStyle={{
            paddingBottom: 500 * PX,
          }}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <SwipeableRow
              handleDelete={() => deleteItem(item)}
              handleEdit={() => editItem(item)}
              handleAdd={activeBag ? () => addItem(item) : null}
            >
              <Disc {...item} index={index} />
            </SwipeableRow>
          )}
        />
      </SafeAreaView>
      <EditDisc visible={visible} close={close} disc={activeDisc} />
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
