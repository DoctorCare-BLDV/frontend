import React, {useCallback, useState} from 'react';

import {UserContext} from './user.context';
import {AuthenticationService} from '@native/infrastructure';
import {showMessage} from 'react-native-flash-message';
import {User} from '@data/models';
import AsyncStorage from '@react-native-community/async-storage';

export const UserContextProvider: React.FC = ({children}) => {
  const [data, setUser] = useState<User>();
  const [isOnLaunchScreen, setLanchScreen] = useState<boolean>(true);

  const fetchUser = useCallback(async () => {
    // const id = await AsyncStorage.getItem('userId');
    // if (!id) return;
    // const {user, errMessage} = await AuthenticationService.getUser(id);
    // if (user) {
    //   setUser(user);
    //   setLanchScreen(false);
    // }
  }, []);

  const checkAuthentication = useCallback(async () => {
    const id = await AsyncStorage.getItem('userId');
    if (!id) return setLanchScreen(false);
    const {user, errMessage} = await AuthenticationService.getUser(id);
    if (user) {
      setUser(user);
      setLanchScreen(false);
      return;
    }
    setLanchScreen(false);
    return showMessage({
      message: errMessage + '',
      type: 'danger',
    });
  }, []);

  const signOut = React.useCallback(() => {
    return new Promise<boolean>(res => {
      setTimeout(() => {
        setUser(undefined);
        res(true);
      }, 1000);
    });
  }, []);

  const signIn = React.useCallback(
    async (props: {phone: string; password: string}) => {
      const {errMessage} = await AuthenticationService.login(props);
      if (!!errMessage) {
        return showMessage({
          message: errMessage,
          type: 'danger',
        });
      }
    },
    [],
  );

  return (
    <UserContext.Provider
      value={{
        user: data,
        isOnLaunchScreen,
        fetchUser,
        checkAuthentication,
        signOut,
        signIn,
      }}>
      {children}
    </UserContext.Provider>
  );
};
