import React, { useEffect, useContext, useState } from 'react';
import {
  View,
  Text,
  Button,
  Colors,
  TouchableOpacity,
} from 'react-native-ui-lib';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import { StyleSheet, ActivityIndicator, Dimensions, Modal } from 'react-native';
import Slider from '@react-native-community/slider';
import { ColorPicker } from 'react-native-color-picker';
import { Overlay } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';

import { useMutation } from '@apollo/client';
import { CREATE_BAG } from '../../graphql/mutations';
import { QUERY_BAGS } from '../../graphql/queries';

import TextField from '../../components/TextField';
import Bag from '../../components/Bag';

import { AuthContext } from '../../context/auth';
import { ToastContext } from '../../context/toast';

const { width } = Dimensions.get('window');
const COLOR_WIDTH = width * 0.3;
const PICKER_WIDTH = width * 0.7;

const schema = yup.object().shape({
  name: yup.string().required('Name is required'),
});

function AddBag({ visible, close }) {
  const { notify } = useContext(ToastContext);
  const { user } = useContext(AuthContext);
  const [createBag] = useMutation(CREATE_BAG);
  const [pickerVisible, setPickerVisible] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    errors,
    formState,
    reset,
    watch,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: '',
      capacity: 1,
      color: '#FF0000',
    },
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
      await createBag({
        variables: {
          bag: {
            ...values,
            userId: user.id,
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
        title: 'Created!',
        message: 'Your new bag has been created.',
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
    <Modal visible={visible} animationType="slide" animated>
      <View right>
        <TouchableOpacity
          marginT-80
          marginR-20
          onPress={() => close && close()}
          hitSlop={{
            top: 10,
            right: 10,
            bottom: 10,
            left: 10,
          }}
        >
          <Ionicons name="ios-close" size={36} color={Colors.indigo} />
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
              <Bag color={color} style={styles.color} onPress={toggleOverlay} />
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
            <View marginT-40>
              <View>
                <Button
                  bg-indigo
                  style={[{ paddingVertical: 15 }]}
                  onPress={handleSubmit(onSubmit)}
                >
                  {formState.isSubmitting ? (
                    <ActivityIndicator color={Colors.white} />
                  ) : (
                    <Text text60R white>
                      Add Bag
                    </Text>
                  )}
                </Button>
              </View>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  color: {
    width: COLOR_WIDTH,
  },
});

export default AddBag;
