import React from 'react';
import {UserContext} from './user.context';
export function useUser() {
  const {user, signOut} = React.useContext(UserContext);
  return {user, signOut};
}
