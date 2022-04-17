import React from 'react';
import {User} from '@data/models';

import {UserContext} from './user.context';

export const UserContextProvider: React.FC = ({children}) => {
  const [user, setUser] = React.useState<User>();
  const getPreviousSession = React.useCallback(() => {
    setTimeout(() => {
      setUser({id: 11111});
    }, 1000);
  }, []);
  const signOut = React.useCallback(() => {
    return new Promise<boolean>(res => {
      setTimeout(() => {
        setUser(undefined);
        res(true);
      }, 1000);
    });
  }, []);
  React.useEffect(() => {
    getPreviousSession();
  }, [getPreviousSession]);
  return (
    <UserContext.Provider value={{user, signOut}}>
      {children}
    </UserContext.Provider>
  );
};
