import {useCart, useUser} from '@app/shared/contexts';
import React, {useCallback} from 'react';
import {Alert} from 'react-native';

export function useProfileModel() {
  const {signOut, fetchUser, deleteAccount} = useUser();
  const {clearCart} = useCart();
  const [isPhotoPickerVisible, setPhotoPickerVisible] = React.useState(false);

  const onSignOut = useCallback(async () => {
    let response = await signOut();
    if (!!response) clearCart();
  }, [signOut, clearCart]);

  const onConfirmLogout = React.useCallback(() => {
    Alert.alert('Đăng xuất', 'Bạn có chắc chắn muốn đăng xuất?', [
      {text: 'Đăng xuất', onPress: onSignOut, style: 'destructive'},
      {text: 'Hủy'},
    ]);
  }, [onSignOut]);

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
