import React from 'react';

import {
  FloatingReactionNodePosition,
  FloatingReactionSource,
} from '@app/framework/native/components';

export interface FloatingReactionSourceState extends FloatingReactionSource {
  id: number;
}

export type FloatingReactionContextState = {
  sources: FloatingReactionSourceState[];
  target: FloatingReactionNodePosition | undefined;
  setFloatingReactionTarget: (target: FloatingReactionNodePosition) => void;
  addFloatingReactionSource: (source: FloatingReactionSource) => number;
  removeFloatingReactionSource: (sourceId: number) => void;
};

export const INITIAL_VALUE: FloatingReactionContextState = {
  sources: [],
  target: undefined,
  setFloatingReactionTarget: () => {},
  addFloatingReactionSource: () => -1,
  removeFloatingReactionSource: () => {},
};

export const FloatingReactionContext =
  React.createContext<FloatingReactionContextState>(INITIAL_VALUE);
