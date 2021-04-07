import React, { useEffect, useContext, useState } from 'react';
import { View, Text, Colors, TouchableOpacity } from 'react-native-ui-lib';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import { Dimensions, Modal } from 'react-native';
import Slider from '@react-native-community/slider';
import { ColorPicker } from 'react-native-color-picker';
import { Overlay } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';

import { useMutation } from '@apollo/client';
import { UPDATE_BAG } from '../../graphql/mutations';
import { QUERY_BAGS } from '../../graphql/queries';

import TextField from '../../components/TextField';
import BagSvg from '../../../assets/svgs/bag';

import { AuthContext } from '../../context/auth';
import { ToastContext } from '../../context/toast';

const { width } = Dimensions.get('window');
const PICKER_WIDTH = width * 0.7;

const schema = yup.object().shape({
  name: yup.string().required('Name is required'),
});

function EditBagForm({ bag, close }) {
  const { notify } = useContext(ToastContext);
  const { user } = useContext(AuthContext);
  const [updateBag] = useMutation(UPDATE_BAG);
  const [pickerVisible, setPickerVisible] = useState(false);
  const preloadedValues = {
    name: bag?.name,
    capacity: bag?.capacity,
    color: bag?.color || '#FF0000',
  };
  const { register, handleSubmit, setValue, errors, reset, watch } = useForm({
    resolver: yupResolver(schema),
    defaultValues: preloadedValues,
  });

  useEffect(() => {
    register('name');
    register('capacity');
    register('color');
  }, [register]);

  const { name, capacity, color } = watch();

  const toggleOverlay = () => {
    setPickerVisible(!pickerVisible);
  };

  async function onSubmit(values) {
    try {
      await updateBag({
        variables: {
          bag: {
            ...values,
            id: bag.id,
          },
        },
        refetchQueries: [
          {
            query: QUERY_BAGS,
            variables: { where: { userId: user.id } },
          },
        ],
        awaitRefetchQueries: true,
      });

      close && close();
      reset();

      notify({
        title: 'Saved!',
        message: 'Your changes have been saved.',
        duration: 3000,
      });
    } catch (e) {
      notify({
        title: 'Oops',
        message: e.message,
      });
    }
  }

  return (
    <>
      <View
        centerV
        row
        spread
        // height needs to be calculated headerHeight
        style={{ backgroundColor: Colors.slate, height: 92 }}
      >
        <TouchableOpacity
          marginT-50
          marginL-20
          onPress={() => {
            close && close();
            reset();
          }}
          hitSlop={{
            top: 10,
            right: 10,
            bottom: 10,
            left: 10,
          }}
        >
          <Ionicons name="ios-close" size={36} color={Colors.white} />
        </TouchableOpacity>
        <Text white marginT-50 text70BO>
          Edit Bag
        </Text>
        <TouchableOpacity
          marginT-50
          marginR-20
          onPress={handleSubmit(onSubmit)}
          hitSlop={{
            top: 10,
            right: 10,
            bottom: 10,
            left: 10,
          }}
        >
          <Text white text70BO>
            Save
          </Text>
        </TouchableOpacity>
      </View>
      <View flex useSafeArea>
        <KeyboardAwareScrollView keyboardDismissMode="interactive">
          <View paddingH-30>
            <View marginT-30>
              <TextField
                title="Name"
                autoCapitalize="words"
                clearButtonMode="while-editing"
                value={name}
                onChangeText={(val) => setValue('name', val)}
                error={errors?.name?.message}
              />
            </View>
            <View spread row center marginT-20>
              <Text marginR-20 text80M text80M slate>
                Capacity
              </Text>
              <Slider
                style={{ width: 200, height: 40 }}
                minimumValue={1}
                maximumValue={30}
                step={1}
                value={capacity}
                minimumTrackTintColor={Colors.indigo}
                maximumTrackTintColor="#FFFFFF"
                onValueChange={(val) => {
                  setValue('capacity', val);
                }}
              />
              <Text marginL-20 text80M slate>
                {capacity}
              </Text>
            </View>
            <View marginT-20>
              <Text text80M slate>
                Color
              </Text>
              <View>
                <TouchableOpacity onPress={toggleOverlay}>
                  <View>
                    <BagSvg color={color} />
                  </View>
                </TouchableOpacity>
                <Overlay
                  isVisible={pickerVisible}
                  animationType="fade"
                  onBackdropPress={toggleOverlay}
                  backdropStyle={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
                  overlayStyle={{
                    borderRadius: 20,
                    margin: 20,
                    padding: 20,
                  }}
                >
                  <View
                    style={[
                      { width: PICKER_WIDTH },
                      { height: PICKER_WIDTH * 1.5 },
                    ]}
                  >
                    <Text text80R center text80M slate>
                      Press color button to select color
                    </Text>
                    <ColorPicker
                      defaultColor={color}
                      onColorSelected={(val) => {
                        setValue('color', val);
                        toggleOverlay();
                      }}
                      style={{ flex: 1 }}
                    />
                  </View>
                </Overlay>
              </View>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </View>
    </>
  );
}

function EditBag({ visible, close, bag }) {
  return (
    <Modal visible={visible} animationType="slide" animated>
      {bag ? <EditBagForm bag={bag} close={close} /> : null}
    </Modal>
  );
}

export default EditBag;
