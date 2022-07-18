import {useUser} from '@app/shared/contexts';
import React from 'react';
import {Alert} from 'react-native';

export function useProfileModel() {
  const {signOut, fetchUser, deleteAccount} = useUser();
  const [isPhotoPickerVisible, setPhotoPickerVisible] = React.useState(false);

  const onConfirmLogout = React.useCallback(() => {
    Alert.alert('Đăng xuất', 'Bạn có chắc chắn muốn đăng xuất?', [
      {text: 'Đăng xuất', onPress: signOut, style: 'destructive'},
      {text: 'Hủy'},
    ]);
  }, [signOut]);

  const onConfirmDeleteAccount = React.useCallback(() => {
    Alert.alert('Xoá tài khoản', 'Bạn có chắc chắn muốn xóa tài khoản không?', [
      {text: 'Xóa', onPress: deleteAccount, style: 'destructive'},
      {text: 'Hủy'},
    ]);
  }, [deleteAccount]);

  return {
    onConfirmLogout,
    onConfirmDeleteAccount,
    fetchUser,
    isPhotoPickerVisible,
    setPhotoPickerVisible,
  };
}
