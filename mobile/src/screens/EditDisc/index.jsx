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
import { darken } from 'polished';
import { Ionicons } from '@expo/vector-icons';

import { useMutation } from '@apollo/client';
import { UPDATE_DISC } from '../../graphql/mutations';
import { QUERY_DISCS } from '../../graphql/queries';

import TextField from '../../components/TextField';

import { AuthContext } from '../../context/auth';
import { ToastContext } from '../../context/toast';

const { width } = Dimensions.get('window');
const FIELD_WIDTH = width * 0.45;
const COLOR_WIDTH = width * 0.3;
const PICKER_WIDTH = width * 0.7;

const schema = yup.object().shape({
  brand: yup.string().required('Brand is required'),
  mold: yup.string().required('Mold is required'),
  plastic: yup.string().required('Plastic is required'),
});

function EditDisc({ visible, close, item }) {
  const { notify } = useContext(ToastContext);
  const { user } = useContext(AuthContext);
  const [updateDisc] = useMutation(UPDATE_DISC);
  const [pickerVisible, setPickerVisible] = useState(false);
  const preloadedValues = {
    brand: item?.brand,
    mold: item?.mold,
    plastic: item?.plastic,
    color: item?.color || '#FF0000',
    weight: item?.weight,
    speed: item?.speed,
    glide: item?.glide,
    turn: item?.turn,
    fade: item?.fade,
  };
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
    defaultValues: preloadedValues,
  });

  useEffect(() => {
    register('brand');
    register('mold');
    register('plastic');
    register('color');
    register('weight');
    register('speed');
    register('glide');
    register('turn');
    register('fade');
  }, [register]);

  const {
    brand,
    mold,
    plastic,
    color,
    weight,
    speed,
    glide,
    turn,
    fade,
  } = watch();

  const toggleOverlay = () => {
    setPickerVisible(!pickerVisible);
  };

  async function onSubmit(values) {
    try {
      await updateDisc({
        variables: {
          disc: {
            ...values,
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

      close && close();
      reset();

      notify({
        title: 'Saved!',
        message: 'Your changed have been saved.',
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
            <View marginT-20>
              <View centerH spread row top>
                <View>
                  <View marginT-10>
                    <TextField
                      title="Brand"
                      autoCapitalize="words"
                      clearButtonMode="while-editing"
                      style={[{ width: FIELD_WIDTH }]}
                      value={brand}
                      onChangeText={(val) => setValue('brand', val)}
                      error={errors?.brand?.message}
                    />
                  </View>
                  <View marginT-10>
                    <TextField
                      title="Mold"
                      autoCapitalize="words"
                      clearButtonMode="while-editing"
                      style={[{ width: FIELD_WIDTH }]}
                      value={mold}
                      onChangeText={(val) => setValue('mold', val)}
                      error={errors?.mold?.message}
                    />
                  </View>
                  <View marginT-10>
                    <TextField
                      title="Plastic"
                      autoCapitalize="words"
                      clearButtonMode="while-editing"
                      style={[{ width: FIELD_WIDTH }]}
                      value={plastic}
                      onChangeText={(val) => setValue('plastic', val)}
                      error={errors?.plastic?.message}
                    />
                  </View>
                </View>
                <View marginT-10>
                  <Text text80M slate>
                    Color
                  </Text>
                  <TouchableOpacity
                    onPress={toggleOverlay}
                    style={styles.color}
                  >
                    <View marginT-10>
                      <View
                        style={[
                          { backgroundColor: color },
                          { borderColor: darken(0.1, color) },
                          { borderWidth: 1 },
                          { height: COLOR_WIDTH },
                          { width: COLOR_WIDTH },
                          { borderRadius: COLOR_WIDTH / 2 },
                        ]}
                      />
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
              <View spread row center marginT-20>
                <Text marginR-20 text80M text80M slate>
                  Weight
                </Text>
                <Slider
                  style={{ width: 200, height: 40 }}
                  minimumValue={140}
                  maximumValue={185}
                  step={1}
                  value={weight}
                  minimumTrackTintColor={Colors.indigo}
                  maximumTrackTintColor="#FFFFFF"
                  onValueChange={(val) => {
                    setValue('weight', val);
                  }}
                />
                <Text marginL-20 text80M slate>
                  {weight}
                </Text>
              </View>
              <View spread row center marginT-10>
                <Text marginR-20 text80M slate>
                  Speed
                </Text>
                <Slider
                  style={{ width: 200, height: 40 }}
                  minimumValue={1}
                  maximumValue={14}
                  step={1}
                  value={speed}
                  minimumTrackTintColor={Colors.mint}
                  maximumTrackTintColor="#FFFFFF"
                  onValueChange={(val) => {
                    setValue('speed', val);
                  }}
                />
                <Text marginL-20 text80M slate>
                  {speed}
                </Text>
              </View>
              <View spread row center marginT-10>
                <Text marginR-20 text80M slate>
                  Glide
                </Text>
                <Slider
                  style={{ width: 200, height: 40 }}
                  minimumValue={1}
                  maximumValue={7}
                  step={1}
                  value={glide}
                  minimumTrackTintColor={Colors.orange}
                  maximumTrackTintColor="#FFFFFF"
                  onValueChange={(val) => {
                    setValue('glide', val);
                  }}
                />
                <Text marginL-20 text80M slate>
                  {glide}
                </Text>
              </View>
              <View spread row center marginT-10>
                <Text marginR-20 text80M slate>
                  Turn
                </Text>
                <Slider
                  style={{ width: 200, height: 40 }}
                  minimumValue={-5}
                  maximumValue={0}
                  step={1}
                  value={turn}
                  inverted={true}
                  minimumTrackTintColor="#FFFFFF"
                  maximumTrackTintColor={Colors.blue}
                  onValueChange={(val) => {
                    setValue('turn', val);
                  }}
                />
                <Text marginL-20 text80M slate>
                  {turn}
                </Text>
              </View>
              <View spread row center marginT-10>
                <Text marginR-20 text80M slate>
                  Fade
                </Text>
                <Slider
                  style={{ width: 200, height: 40 }}
                  minimumValue={0}
                  maximumValue={5}
                  step={1}
                  value={fade}
                  minimumTrackTintColor={Colors.yellow}
                  maximumTrackTintColor="#FFFFFF"
                  onValueChange={(val) => {
                    setValue('fade', val);
                  }}
                />
                <Text marginL-20 text80M slate>
                  {fade}
                </Text>
              </View>
            </View>
            <View marginT-20>
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
                      Save Changes
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

export default EditDisc;
