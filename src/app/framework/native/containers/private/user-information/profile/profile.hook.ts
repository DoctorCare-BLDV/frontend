import {useUser} from '@app/shared/contexts';
import React from 'react';
import {Alert} from 'react-native';

export function useProfileModel() {
  const {signOut, fetchUser} = useUser();

  const onConfirmLogout = React.useCallback(() => {
    Alert.alert('Đăng xuất', 'Bạn có chắc chắn muốn đăng xuất?', [
      {text: 'Đăng xuất', onPress: signOut, style: 'destructive'},
      {text: 'Hủy'},
    ]);
  }, [signOut]);

  return {
    onConfirmLogout,
    fetchUser,
  };
}
