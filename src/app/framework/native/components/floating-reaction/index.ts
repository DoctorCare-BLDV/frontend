import React from 'react';

export * from './floating-reaction';
export * from './list';

export type FloatingReactionNodePosition = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export type FloatingReactionSourceElement = React.ReactElement<any>;

export type FloatingReactionSource = {
  element: FloatingReactionSourceElement;
  position: FloatingReactionNodePosition;
};
