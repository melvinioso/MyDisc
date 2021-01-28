import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Assets } from 'react-native-ui-lib';
import { PX } from '../../theme';
import Image from '../Image';

function Header(props) {
  const {
    onCloseButtonPress,
    title,
    height,
    bottomColor,
    topColor,
    closeButtonMargin,
    headerImage,
    zIndex,
  } = props;
  const children = React.Children.map(
    props.children,
    (childComponent, index) => {
      return <>{childComponent}</>;
    }
  );
  return (
    <View style={[styles.header, { height: height, zIndex: zIndex }]}>
      {headerImage !== null ? (
        <Image source={headerImage} style={styles.headerImage} />
      ) : null}
      <LinearGradient
        colors={[bottomColor, topColor]}
        start={[0, 1]}
        end={[0, 0]}
        style={styles.gradient}
      />
      <View style={styles.buttonContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.screenTitle}>{title}</Text>
        </View>
        {onCloseButtonPress ? (
          <TouchableOpacity
            style={{ marginRight: closeButtonMargin }}
            onPress={onCloseButtonPress}
          >
            <Image
              style={styles.circleClose}
              source={Assets.general.circleClose}
            />
          </TouchableOpacity>
        ) : null}
      </View>
      {children}
    </View>
  );
}

Header.defaultProps = {
  height: 455 * PX,
  bottomColor: Colors.headerSliderGrey,
  topColor: Colors.headerSliderLightGrey,
  headerImage: null,
};

const styles = StyleSheet.create({
  gradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  header: {
    height: 523 * PX,
    borderBottomLeftRadius: 75 * PX,
    borderBottomRightRadius: 75 * PX,
    overflow: 'hidden',
  },
  headerButton: {
    borderTopRightRadius: 50 * PX,
    borderBottomRightRadius: 50 * PX,
    overflow: 'hidden',
    height: 45,
  },
  buttonContainer: {
    width: '100%',
    height: 160 * PX,
    marginTop: 300 * PX,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  circleClose: {
    width: 130 * PX,
    height: 130 * PX,
    marginRight: 50 * PX,
  },
  titleContainer: {
    height: 114 * PX,
    minWidth: 381 * PX,
    backgroundColor: Colors.blue,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 115 * PX,
    borderTopRightRadius: 50 * PX,
    borderBottomRightRadius: 50 * PX,
  },
  screenTitle: {
    fontSize: 58 * PX,
    color: '#fff',
  },
  headerImage: {
    resizeMode: 'cover',
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
  },
});

export default Header;
