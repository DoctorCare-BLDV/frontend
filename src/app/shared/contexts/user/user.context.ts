import React from 'react';
import {User} from '@data/models';

export type UserContextState = {
  user?: User;
  signOut: () => Promise<boolean>;
  signIn: (props: {phone: string; password: string}) => void;
  isOnLaunchScreen: boolean;
  fetchUser: () => void;
  checkAuthentication: () => void;
};

export const INITIAL_VALUE: UserContextState = {
  signOut: () => Promise.resolve(false),
  signIn: () => null,
  fetchUser: () => null,
  checkAuthentication: () => null,
  isOnLaunchScreen: true,
};

export const UserContext = React.createContext<UserContextState>(INITIAL_VALUE);
