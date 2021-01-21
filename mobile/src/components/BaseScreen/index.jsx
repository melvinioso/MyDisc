import React from 'react';
import { View, Constants } from 'react-native-ui-lib';
import { ScrollView, StyleSheet } from 'react-native';

function BaseScreen({ header, fixedFooter, children, disableScroll }) {
  return (
    <View useSafeArea flex>
      <View marginT-30 paddingH-20>
        {header}
      </View>
      {disableScroll ? (
        <View style={styles.scrollView}>{children}</View>
      ) : (
        <ScrollView contentContainerStyle={styles.scrollView}>
          {children}
        </ScrollView>
      )}
      {fixedFooter ? (
        <View padding-20 style={styles.footer}>
          {fixedFooter}
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    width: Constants.screenWidth,
  },
});

export default BaseScreen;
