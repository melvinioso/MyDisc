import React from 'react';
import { View, Colors } from 'react-native-ui-lib';
import { ScrollView } from 'react-native';

import Disc from '../../src/components/Disc';

import { storiesOf } from '@storybook/react-native';

storiesOf('Disc', module)
  .addDecorator((storyFn) => (
    <View flex useSafeArea paddingH-20>
      <ScrollView style={{ flex: 1 }}>{storyFn()}</ScrollView>
    </View>
  ))
  .add('default', () => (
    <>
      <Disc size={80} color={Colors.mint} brand="Discraft" mold="Buzzz" />
    </>
  ));
