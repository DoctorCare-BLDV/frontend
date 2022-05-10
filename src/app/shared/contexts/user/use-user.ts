import React from 'react';
import {UserContext} from './user.context';
export function useUser() {
  const {user, signOut, signIn} = React.useContext(UserContext);
  return {user, signOut, signIn};
}

export function useLaunchScreen() {
  const {checkAuthentication, isOnLaunchScreen} = React.useContext(UserContext);
  return {checkAuthentication, isOnLaunchScreen};
}
