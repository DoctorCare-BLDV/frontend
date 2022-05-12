import React, {useCallback, useState} from 'react';

import {UserContext} from './user.context';
import {AuthenticationService, UserLocalService} from '@native/infrastructure';
import {showMessage} from 'react-native-flash-message';
import {User} from '@data/models';
import AsyncStorage from '@react-native-community/async-storage';

export const UserContextProvider: React.FC = ({children}) => {
  const [data, setUser] = useState<User>();
  const [isOnLaunchScreen, setLanchScreen] = useState<boolean>(true);

  const fetchUser = useCallback(async () => {
    const id = await AsyncStorage.getItem('userId');
    if (!id) return;
    const {user} = await AuthenticationService.getUser(id);
    if (user) {
      setUser(user);
    }
  }, []);

  const checkAuthentication = useCallback(async () => {
    const id = await AsyncStorage.getItem('userId');
    if (!id) return setLanchScreen(false);
    const token = await AsyncStorage.getItem('token');
    AuthenticationService.setAuthorizationHeader(token + '');
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

  const signOut = React.useCallback(async () => {
    const id = await AsyncStorage.getItem('userId');
    if (!id) return;
    const errMessage = await AuthenticationService.logout(id);
    if (!errMessage) {
      UserLocalService.clearLocalData();
      setUser(undefined);
    }
  }, []);

  const signIn = React.useCallback(
    async (props: {phone: string; password: string}) => {
      const {user, errMessage} = await AuthenticationService.login(props);
      if (!!errMessage) {
        return showMessage({
          message: errMessage,
          type: 'danger',
        });
      }
      if (!user) {
        return showMessage({
          message: 'Đã có lỗi xảy ra, vui lòng thử lại sau',
          type: 'danger',
        });
      }
      setUser(user);
      UserLocalService.saveAuthenInfor({
        token: user.token,
        userId: user.userInfoId,
      });
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
