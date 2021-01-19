import { Animated, I18nManager } from 'react-native';

const { add, multiply } = Animated;

/**
 * Modified iOS-style slide in from the right.
 */
export function forHorizontalIOS({
  current,
  next,
  inverted,
  layouts: { screen },
}) {
  const translateFocused = multiply(
    current.progress.interpolate({
      inputRange: [0, 1],
      outputRange: [screen.width, 0],
      extrapolate: 'clamp',
    }),
    inverted
  );

  const translateUnfocused = next
    ? multiply(
        next.progress.interpolate({
          inputRange: [0, 1],
          outputRange: [0, screen.width * -1],
          extrapolate: 'clamp',
        }),
        inverted
      )
    : 0;

  const overlayOpacity = current.progress.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  const shadowOpacity = current.progress.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 0.3],
    extrapolate: 'clamp',
  });

  return {
    cardStyle: {
      opacity: overlayOpacity,
      transform: [
        // Translation for the animation of the current card
        { translateX: translateFocused },
        // Translation for the animation of the card on top of this
        { translateX: translateUnfocused },
      ],
    },
    overlayStyle: { opacity: overlayOpacity },
    shadowStyle: { shadowOpacity },
  };
}

/**
 * Standard UIKit style animation for the header where the title fades into the back button label.
 */
export function forUIKit({ current, next, layouts }) {
  const defaultOffset = 100;
  const leftSpacing = 27;

  // The title and back button title should cross-fade to each other
  // When screen is fully open, the title should be in center, and back title should be on left
  // When screen is closing, the previous title will animate to back title's position
  // And back title will animate to title's position
  // We achieve this by calculating the offsets needed to translate title to back title's position and vice-versa
  const leftLabelOffset = layouts.leftLabel
    ? (layouts.screen.width - layouts.leftLabel.width) / 2 - leftSpacing
    : defaultOffset;
  const titleLeftOffset = layouts.title
    ? (layouts.screen.width - layouts.title.width) / 2 - leftSpacing
    : defaultOffset;

  // When the current title is animating to right, it is centered in the right half of screen in middle of transition
  // The back title also animates in from this position
  const rightOffset = layouts.screen.width / 4;

  const progress = add(
    current.progress.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
      extrapolate: 'clamp',
    }),
    next
      ? next.progress.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 1],
          extrapolate: 'clamp',
        })
      : 0
  );

  return {
    leftButtonStyle: {
      opacity: progress.interpolate({
        inputRange: [0.3, 1, 1.5],
        outputRange: [0, 1, 0],
      }),
    },
    leftLabelStyle: {
      transform: [
        {
          translateX: progress.interpolate({
            inputRange: [0, 1, 2],
            outputRange: I18nManager.isRTL
              ? [-rightOffset, 0, leftLabelOffset]
              : [leftLabelOffset, 0, -rightOffset],
          }),
        },
      ],
    },
    rightButtonStyle: {
      opacity: progress.interpolate({
        inputRange: [0.3, 1, 1.5],
        outputRange: [0, 1, 0],
      }),
    },
    titleStyle: {
      opacity: progress.interpolate({
        inputRange: [0, 0.4, 1, 1.5],
        outputRange: [0, 0.1, 1, 0],
      }),
      transform: [
        {
          translateX: progress.interpolate({
            inputRange: [0.5, 1, 2],
            outputRange: I18nManager.isRTL
              ? [-titleLeftOffset, 0, rightOffset]
              : [rightOffset, 0, -titleLeftOffset],
          }),
        },
      ],
    },
    backgroundStyle: {
      transform: [
        {
          translateX: progress.interpolate({
            inputRange: [0, 1, 2],
            outputRange: I18nManager.isRTL
              ? [-layouts.screen.width, 0, layouts.screen.width]
              : [layouts.screen.width, 0, -layouts.screen.width],
          }),
        },
      ],
    },
  };
}
