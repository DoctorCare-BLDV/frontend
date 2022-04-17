import React from 'react';
import {useQuery} from 'react-query';

import {UserContext} from './user.context';
import {AuthenticationService} from '@native/infrastructure';

export const UserContextProvider: React.FC = ({children}) => {
  const {data, remove} = useQuery('user', AuthenticationService.getUser);

  const signOut = React.useCallback(() => {
    return new Promise<boolean>(res => {
      setTimeout(() => {
        remove();
        res(true);
      }, 1000);
    });
  }, [remove]);

  return (
    <UserContext.Provider value={{user: data, signOut}}>
      {children}
    </UserContext.Provider>
  );
};
