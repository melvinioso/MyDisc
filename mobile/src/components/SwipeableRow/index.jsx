import React, { Component } from 'react';
import { Colors } from 'react-native-ui-lib';
import { Animated, StyleSheet, Text, View, I18nManager } from 'react-native';

import { RectButton, Swipeable } from 'react-native-gesture-handler';

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
        overshootRight={false}
        renderRightActions={this.renderRightActions}
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
});
