import React, {useEffect, useState, useMemo} from 'react';
import {StyleSheet, Animated, Easing} from 'react-native';

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
  const [animatedTranslateValue] = useState(new Animated.Value(0));
  const [animatedTranslateYValue] = useState(new Animated.Value(0));
  const [element, setElement] = useState<FloatingReactionSourceElement>();

  useEffect(() => {
    setElement(React.cloneElement(source.element));
    onStartReaction();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (element) {
      Animated.parallel([
        Animated.timing(animatedTranslateValue, {
          toValue: 1,
          easing: Easing.quad,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(animatedTranslateYValue, {
          toValue: 1,
          easing: Easing.bezier(0.33, 0.61, 0.59, 0.96),
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start(({finished}) => {
        if (finished) {
          onFinishReaction();
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [element]);

  const containerStyle = useMemo(() => {
    return [
      {
        transform: [
          {
            scale: animatedTranslateValue.interpolate({
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
            translateX: animatedTranslateValue.interpolate({
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
        opacity: animatedTranslateValue.interpolate({
          inputRange: [0, 0.8, 1],
          outputRange: [1, 0.6, 0],
        }),
      },
    ];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
