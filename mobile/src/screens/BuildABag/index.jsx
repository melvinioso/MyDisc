import React, { useState, useContext } from 'react';
import { StyleSheet, SafeAreaView, Dimensions, Animated } from 'react-native';
import { View, Text, Colors, Button } from 'react-native-ui-lib';
import { get } from 'lodash';

import { useQuery } from '@apollo/client';
import { QUERY_BAGS } from '../../graphql/queries';

import Bag from '../../components/Bag';

import { AuthContext } from '../../context/auth';

import { PX } from '../../theme';

const { width } = Dimensions.get('window');
const SPACING = 10;
const ITEM_SIZE = width * 0.72;
const SPACER_ITEM_SIZE = (width - ITEM_SIZE) / 2;

function MyBags() {
  const { user } = useContext(AuthContext);
  const [bagFilter, setBagFilter] = useState(null);
  const [activeBag, setActiveBag] = useState(null);
  const scrollX = React.useRef(new Animated.Value(0)).current;
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

  const spacedBags = [
    { key: 'left-spacer' },
    ...filteredBags,
    { key: 'right-spacer' },
  ];

  function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : null;
  }

  function brightness(hex) {
    const c = hexToRgb(hex);

    const r = c.r * c.r * 0.241;
    const g = c.g * c.g * 0.691;
    const b = c.b * c.b * 0.068;

    return parseInt(Math.sqrt(r + g + b), 10);
  }

  return (
    <SafeAreaView style={styles.container}>
      <Animated.FlatList
        style={{
          flexGrow: 0,
        }}
        showsHorizontalScrollIndicator={false}
        horizontal
        data={spacedBags}
        keyExtractor={(item) => item.id && item.id.toString()}
        snapToInterval={ITEM_SIZE}
        decelerationRate={0}
        bounces={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true }
        )}
        onMomentumScrollEnd={(item) => setActiveBag(item)}
        scrollEventThrottle={16}
        renderItem={({ item, index }) => {
          if (!item.name) {
            return <View style={{ width: SPACER_ITEM_SIZE }} />;
          }

          const inputRange = [
            (index - 2) * ITEM_SIZE,
            (index - 1) * ITEM_SIZE,
            index * ITEM_SIZE,
          ];

          const translateY = scrollX.interpolate({
            inputRange,
            outputRange: [0, -50, 0],
          });

          const variant = brightness(item.color) > 130 ? 'black' : 'white';

          return (
            <View style={{ width: ITEM_SIZE, marginTop: 280 * PX }}>
              <Animated.View
                style={{
                  marginHorizontal: SPACING,
                  padding: SPACING * 2,
                  alignItems: 'center',
                  backgroundColor: item.color,
                  borderRadius: 34,
                  transform: [{ translateY }],
                }}
              >
                <Text
                  text60BO
                  style={{
                    color: variant,
                  }}
                >
                  {item.name}
                </Text>
                <Text
                  text80BO
                  style={{
                    color: variant,
                  }}
                >
                  10 / {item.capacity}
                </Text>
                <Bag
                  color={variant}
                  onPress={() => {
                    setActiveBag(item);
                  }}
                />
              </Animated.View>
            </View>
          );
        }}
      />
      <View center>
        <Button
          bg-indigo
          label="Edits Discs"
          style={styles.addABag}
          size="medium"
          onPress={() => {}}
        />
      </View>
      <View center>
        <Text>{activeBag?.name}</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  addABag: {
    top: -10,
  },
});

export default MyBags;
