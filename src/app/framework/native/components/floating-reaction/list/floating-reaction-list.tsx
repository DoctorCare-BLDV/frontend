import React, {useCallback} from 'react';
import {View, StyleSheet} from 'react-native';

import {useFloatingReaction} from '@app/shared/contexts';
import {FloatingReactionSourceState} from '@app/shared/contexts/floating-reaction/floating-reaction.context';

import {FloatingReaction} from '../floating-reaction';

export interface FloatingReactionListProps {}

export const FloatingReactionList: React.FC<
  FloatingReactionListProps
> = ({}) => {
  const {sources, target, removeFloatingReactionSource} = useFloatingReaction();

  const renderSources = useCallback(() => {
    return sources.map((source: FloatingReactionSourceState, index: number) => {
      if (!target) {
        return null;
      }

      return (
        <FloatingReaction
          key={index}
          source={source}
          target={target}
          onFinishReaction={() => {
            removeFloatingReactionSource(source.id);
          }}
        />
      );
    });
  }, [sources, target, removeFloatingReactionSource]);

  return (
    <View pointerEvents="none" style={styles.container}>
      {renderSources()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
});
