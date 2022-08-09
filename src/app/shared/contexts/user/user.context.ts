import React from 'react';
import {PostImageAPI, User} from '@data/models';

export type UserContextState = {
  user?: User;
  signOut: () => Promise<boolean>;
  deleteAccount: () => Promise<void>;
  signIn: (props: {phone: string; password: string}) => Promise<void>;
  isOnLaunchScreen: boolean;
  fetchUser: () => void;
  checkAuthentication: () => void;
  updateProfile: (body: {
    address: string;
    bankAccount?: string;
    bankName?: string;
    fullName: string;
    email: string;
  }) => Promise<void>;
  onUpdateAvatar: (img: PostImageAPI) => void;
};

export const INITIAL_VALUE: UserContextState = {
  signOut: () => Promise.resolve(false),
  deleteAccount: () => Promise.resolve(),
  signIn: () => Promise.resolve(),
  updateProfile: () => Promise.resolve(),
  fetchUser: () => null,
  checkAuthentication: () => null,
  onUpdateAvatar: () => null,
  isOnLaunchScreen: true,
};

export const UserContext = React.createContext<UserContextState>(INITIAL_VALUE);
