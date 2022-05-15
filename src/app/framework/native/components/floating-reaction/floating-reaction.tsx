import React, {useEffect, useState, useMemo} from 'react';
import {StyleSheet} from 'react-native';
// import {Animated, Easing} from 'react-native';
import Animated, {
  block,
  call,
  clockRunning,
  cond,
  Easing,
  set,
  useCode,
  useValue,
} from 'react-native-reanimated';
import {timing, useClock} from 'react-native-redash';

import {
  FloatingReactionNodePosition,
  FloatingReactionSource,
  FloatingReactionSourceElement,
} from '.';

export interface FloatingReactionProps {
  source: FloatingReactionSource;
  target: FloatingReactionNodePosition;

  onStartReaction?: () => void;
  onFinishReaction?: () => void;
}

export const FloatingReaction: React.FC<FloatingReactionProps> = ({
  source,
  target,
  onStartReaction = () => {},
  onFinishReaction = () => {},
}) => {
  // const [animatedTranslateXValue] = useState(new Animated.Value(0));
  // const [animatedTranslateYValue] = useState(new Animated.Value(0));

  const clockX = useClock();
  const clockY = useClock();
  const animatedTranslateXValue = useValue(0);
  const animatedTranslateYValue = useValue(0);
  const [element, setElement] = useState<FloatingReactionSourceElement>();

  useEffect(() => {
    setElement(React.cloneElement(source.element));
    onStartReaction();

    const timeout = setTimeout(() => {
      onFinishReaction();
    }, 500);

    return () => {
      clearTimeout(timeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // useEffect(() => {
  //   if (element) {
  //     Animated.parallel([
  //       Animated.timing(animatedTranslateValue, {
  //         toValue: 1,
  //         easing: Easing.quad,
  //         duration: 300,
  //         useNativeDriver: true,
  //       }),
  //       Animated.timing(animatedTranslateYValue, {
  //         toValue: 1,
  //         easing: Easing.bezier(0.33, 0.61, 0.59, 0.96),
  //         duration: 300,
  //         useNativeDriver: true,
  //       }),
  //     ]).start(({finished}) => {
  //       if (finished) {
  //         onFinishReaction();
  //       }
  //     });
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [element]);

  useCode(() => {
    return block([
      cond(element ? 1 : 0, [
        set(
          animatedTranslateXValue,
          timing({
            clock: clockX,
            duration: 300,
            from: animatedTranslateXValue,
            to: 1,
            easing: Easing.quad,
          }),
        ),
        set(
          animatedTranslateYValue,
          timing({
            clock: clockY,
            duration: 300,
            from: animatedTranslateYValue,
            to: 1,
            easing: Easing.bezier(0.33, 0.61, 0.59, 0.96),
          }),
        ),
      ]),
      call(
        [clockRunning(clockX), clockRunning(clockY)],
        ([isClockXRunning, isClockYRunning]) => {
          if (!isClockXRunning && !isClockYRunning && element) {
            onFinishReaction();
          }
        },
      ),
    ]);
  }, [element]);

  const containerStyle = useMemo(() => {
    return [
      {
        transform: [
          {
            scale: animatedTranslateXValue.interpolate({
              inputRange: [0, 1],
              outputRange: [1, 0.4],
            }),
          },
        ],
      },
    ];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const wrapperStyle = useMemo(() => {
    return [
      styles.wrapper,
      {
        transform: [
          {
            translateX: animatedTranslateXValue.interpolate({
              inputRange: [0, 1],
              outputRange: [
                source.position.x,
                target.x + target.width / 2 - source.position.width / 2,
              ],
            }),
          },
          {
            translateY: animatedTranslateYValue.interpolate({
              inputRange: [0, 1],
              outputRange: [
                source.position.y,
                target.y + target.height / 2 - source.position.height / 2,
              ],
            }),
          },
        ],
        opacity: animatedTranslateXValue.interpolate({
          inputRange: [0, 0.8, 1],
          outputRange: [1, 0.6, 0],
        }),
      },
    ];
  }, [animatedTranslateXValue, animatedTranslateYValue, source, target]);

  return (
    <Animated.View pointerEvents="none" style={wrapperStyle}>
      <Animated.View style={containerStyle}>{element}</Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
  },
});
