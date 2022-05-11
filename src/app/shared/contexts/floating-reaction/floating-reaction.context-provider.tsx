import React, {useCallback, useRef, useState} from 'react';

import {useDebouncedCallback} from 'use-debounce';

import {
  FloatingReactionNodePosition,
  FloatingReactionSource,
} from '@app/framework/native/components';

import {
  FloatingReactionContext,
  FloatingReactionSourceState,
} from './floating-reaction.context';

export const FloatingReactionContextProvider: React.FC = ({children}) => {
  const [sources, setSources] = useState<FloatingReactionSourceState[]>([]);
  const [target, setTarget] = useState<FloatingReactionNodePosition>();
  const isAnimating = useRef(false);

  const setFloatingReactionTarget = useCallback(
    (targetNode: FloatingReactionNodePosition) => {
      setTarget(targetNode);
    },
    [],
  );

  const addFloatingReactionSource = useCallback(
    (source: FloatingReactionSource) => {
      isAnimating.current = true;
      const sourceId = Date.now();
      setSources(previousSources => {
        const newSources = [...previousSources];
        newSources.push({
          id: sourceId,
          ...source,
        });
        return newSources;
      });

      return sourceId;
    },
    [],
  );

  const resetSources = useDebouncedCallback(() => {
    if (!isAnimating.current) {
      setSources([]);
    }
  }, 500);

  const removeFloatingReactionSource = useCallback(() => {
    isAnimating.current = false;
    resetSources();
  }, [resetSources]);

  return (
    <FloatingReactionContext.Provider
      value={{
        sources,
        target,
        setFloatingReactionTarget,
        addFloatingReactionSource,
        removeFloatingReactionSource,
      }}>
      {children}
    </FloatingReactionContext.Provider>
  );
};
