import React from 'react';
import {User} from '@data/models';

export type UserContextState = {
  user?: User;
  signOut: () => Promise<boolean>;
};

export const INITIAL_VALUE: UserContextState = {
  signOut: () => Promise.resolve(false),
};

export const UserContext = React.createContext<UserContextState>(INITIAL_VALUE);
