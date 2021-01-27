import React, { createContext, useRef, useState, forwardRef } from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { View, Text } from 'react-native-ui-lib';
import * as Animatable from 'react-native-animatable';

const { width, height } = Dimensions.get('window');

export const ToastContext = createContext({});

const Toast = forwardRef(({ visible, title, message }, ref) => {
  if (!visible) {
    return null;
  }

  const slideInDown = {
    0: {
      translateY: (height / 5) * -1,
      opacity: 0,
    },
    1: {
      translateY: 0,
      opacity: 1,
    },
  };

  return (
    <Animatable.View
      animation={slideInDown}
      duration={300}
      ref={ref}
      style={[styles.toast]}
    >
      <View flex bg-black br20 padding-15 style={[{ opacity: 0.9 }]}>
        {title ? (
          <Text white text70BO>
            {title}
          </Text>
        ) : null}
        <Text white text80R>
          {message}
        </Text>
      </View>
    </Animatable.View>
  );
});

export function ToastProvider({ children }) {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [visible, setVisible] = useState(false);
  const ref = useRef();

  const slideOutUp = {
    0: {
      translateY: 0,
      opacity: 1,
    },
    1: {
      translateY: (height / 5) * -1,
      opacity: 0,
    },
  };

  function notify({ title, message, duration = 4000 }) {
    setTitle(title);
    setMessage(message);

    setVisible(true);

    setTimeout(() => {
      ref?.current?.animate(slideOutUp, 300).then(() => {
        setVisible(false);
      });
    }, duration);
  }

  return (
    <ToastContext.Provider
      value={{
        notify,
      }}
    >
      {children}
      <Toast visible={visible} ref={ref} title={title} message={message} />
    </ToastContext.Provider>
  );
}

const styles = StyleSheet.create({
  toast: {
    position: 'absolute',
    width,
    top: 50,
    paddingHorizontal: 20,
  },
});
