import React from 'react';
import {UserContext} from './user.context';
export function useUser() {
  const {
    user,
    signOut,
    signIn,
    deleteAccount,
    fetchUser,
    onUpdateAvatar,
    updateProfile,
  } = React.useContext(UserContext);
  return {
    user,
    signOut,
    signIn,
    deleteAccount,
    fetchUser,
    onUpdateAvatar,
    updateProfile,
  };
}

export function useLaunchScreen() {
  const {checkAuthentication, isOnLaunchScreen} = React.useContext(UserContext);
  return {checkAuthentication, isOnLaunchScreen};
}
