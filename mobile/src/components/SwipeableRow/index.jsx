import React, { Component } from 'react';
import { Colors } from 'react-native-ui-lib';
import {
  Animated,
  StyleSheet,
  Text,
  View,
  I18nManager,
  Dimensions,
} from 'react-native';

import { RectButton, Swipeable } from 'react-native-gesture-handler';

const { width } = Dimensions.get('window');

export default class SwipeableRow extends Component {
  renderRightAction = (text, color, x, onPress, progress) => {
    const pressHandler = () => {
      onPress();
      this.close();
    };
    return (
      <Animated.View style={{ flex: 1, transform: [{ translateX: 0 }] }}>
        <RectButton
          style={[styles.rightAction, { backgroundColor: color }]}
          onPress={pressHandler}
        >
          <Text style={styles.actionText}>{text}</Text>
        </RectButton>
      </Animated.View>
    );
  };

  renderRightActions = (progress) => {
    const { handleDelete, handleEdit } = this.props;
    return (
      <View
        style={{
          width: 160,
          flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
        }}
      >
        {this.renderRightAction(
          'Edit',
          Colors.indigo,
          160,
          handleEdit,
          progress
        )}
        {this.renderRightAction('Delete', 'red', 80, handleDelete, progress)}
      </View>
    );
  };

  renderLeftAction = (text, color, x, onPress, progress) => {
    const pressHandler = () => {
      onPress();
      this.close();
    };
    return (
      <Animated.View style={{ flex: 1, transform: [{ translateX: 0 }] }}>
        <RectButton
          style={[styles.leftAction, { backgroundColor: color }]}
          onPress={pressHandler}
        >
          <Text style={styles.actionText}>{text}</Text>
        </RectButton>
      </Animated.View>
    );
  };

  renderLeftActions = (progress) => {
    const { handleAddDisc } = this.props;
    if (handleAddDisc === null) return null;

    return (
      <View
        style={{
          width: width,
          flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
        }}
      >
        {this.renderLeftAction(
          'Add to bag',
          Colors.mint,
          width,
          handleAddDisc,
          progress
        )}
      </View>
    );
  };

  updateRef = (ref) => {
    this._swipeableRow = ref;
  };

  close = () => {
    this._swipeableRow.close();
  };

  render() {
    const { children } = this.props;
    return (
      <Swipeable
        ref={this.updateRef}
        friction={2}
        rightThreshold={40}
        leftThreshold={60}
        overshootRight={false}
        renderRightActions={this.renderRightActions}
        renderLeftActions={this.renderLeftActions}
      >
        {children}
      </Swipeable>
    );
  }
}

const styles = StyleSheet.create({
  actionText: {
    color: 'white',
    fontSize: 16,
    backgroundColor: 'transparent',
    padding: 10,
  },
  rightAction: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  leftAction: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
});
