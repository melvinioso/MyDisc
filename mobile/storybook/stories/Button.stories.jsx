import React from 'react';
import { View, Colors } from 'react-native-ui-lib';
import { ScrollView } from 'react-native';
import Button from '../../src/components/Button';

import { storiesOf } from '@storybook/react-native';

storiesOf('Button', module)
  .addDecorator((storyFn) => (
    <View flex useSafeArea paddingH-20>
      <ScrollView style={{ flex: 1 }}>{storyFn()}</ScrollView>
    </View>
  ))
  .add('default', () => (
    <>
      <Button label="Button" />
      <Button label="Button" marginT-10 />
      <Button label="Button" btnColor={Colors.indigo} marginT-10 />
      <Button label="Button" btnColor={Colors.indigo} outline marginT-10 />
    </>
  ))
  .add('outline', () => (
    <>
      <Button label="Button" outline onPress={() => alert('hi there')} />
      <Button label="Button" outline marginT-10 />
    </>
  ));
