import React, { useState } from 'react';
import { Colors } from 'react-native-ui-lib';
import { TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

import AddDisc from '../../screens/AddDisc';
import AddBag from '../../screens/AddBag';

function AddButton(props) {
  const [visible, setVisible] = useState(false);
  const { mode } = props;

  function close() {
    setVisible(false);
  }

  return (
    <>
      <TouchableOpacity
        onPress={() => setVisible(true)}
        hitSlop={{
          top: 10,
          right: 10,
          bottom: 10,
          left: 10,
        }}
      >
        <FontAwesome name="plus" size={28} color={Colors.white} />
      </TouchableOpacity>
      {mode === 'disc' ? (
        <AddDisc visible={visible} close={close} />
      ) : (
        <AddBag visible={visible} close={close} />
      )}
    </>
  );
}

export default AddButton;
