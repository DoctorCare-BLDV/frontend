import React, {useCallback, useState} from 'react';

import {showMessage} from 'react-native-flash-message';
import AsyncStorage from '@react-native-community/async-storage';
import {
  AuthenticationService,
  FirebaseService,
  UserLocalService,
  UserService,
} from '@native/infrastructure';

import {PostImageAPI, User} from '@data/models';

import {UserContext} from './user.context';
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
    FirebaseService.deleteFcmToken(id);
    const errMessage = await AuthenticationService.logout(id);
    if (!errMessage) {
      UserLocalService.clearLocalData();
      setUser(undefined);
    }
  }, []);

  const deleteAccount = React.useCallback(async () => {
    const id = await AsyncStorage.getItem('userId');
    if (!id) return;
    FirebaseService.deleteFcmToken(id);
    const errMessage = await AuthenticationService.deleteUser();
    if (!!errMessage) {
      return showMessage({
        message: errMessage,
        type: 'danger',
      });
    }
    showMessage({
      message: 'T??i kho???n c???a b???n ???? b??? x??a',
      type: 'success',
    });
    UserLocalService.clearLocalData();
    setUser(undefined);
  }, []);

  const updateProfile = React.useCallback(
    async (body: {
      address?: string;
      bankAccount?: string;
      bankName?: string;
      fullName: string;
      email: string;
    }) => {
      const {user, errMessage} = await UserService.updateProfile(body);
      if (!!errMessage) {
        return showMessage({
          message: errMessage,
          type: 'danger',
        });
      }
      if (!user) {
        return showMessage({
          message: '???? c?? l???i x???y ra, vui l??ng th??? l???i sau',
          type: 'danger',
        });
      }
      showMessage({
        message: 'C???p nh???t th??ng tin th??nh c??ng',
        type: 'success',
      });
      setUser(oldUser => ({...oldUser, ...user}));
    },
    [],
  );

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
          message: '???? c?? l???i x???y ra, vui l??ng th??? l???i sau',
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

  const onUpdateAvatar = useCallback(
    async (img: PostImageAPI) => {
      const errorMessage = await UserService.updateAvatar(img);
      if (!!errorMessage) {
        return showMessage({
          message: errorMessage,
          type: 'danger',
        });
      }
      fetchUser();
    },
    [fetchUser],
  );

  return (
    <UserContext.Provider
      value={{
        user: data,
        deleteAccount,
        updateProfile,
        isOnLaunchScreen,
        fetchUser,
        checkAuthentication,
        signOut,
        signIn,
        onUpdateAvatar,
      }}>
      {children}
    </UserContext.Provider>
  );
};
