import React from 'react';
import {FloatingReactionContext} from './floating-reaction.context';

export function useFloatingReaction() {
  const {
    sources,
    target,
    setFloatingReactionTarget,
    addFloatingReactionSource,
    removeFloatingReactionSource,
  } = React.useContext(FloatingReactionContext);
  return {
    sources,
    target,
    setFloatingReactionTarget,
    addFloatingReactionSource,
    removeFloatingReactionSource,
  };
}
