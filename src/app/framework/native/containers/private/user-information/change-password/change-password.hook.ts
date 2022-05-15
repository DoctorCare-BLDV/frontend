import {useCallback, useState} from 'react';
import {showMessage} from 'react-native-flash-message';
import {UserService} from '@app/framework/native/infrastructure';

export function useChangePasswordModel() {
  const [loading, setLoading] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  const submit = useCallback(async () => {
    if (!newPassword || !oldPassword || !confirmNewPassword) {
      showMessage({
        message: 'Vui lòng điền đủ thông tin!',
        type: 'danger',
      });
      return;
    }
    if (newPassword !== confirmNewPassword) {
      showMessage({
        message: 'Nhập lại mật khẩu mới không trùng khớp',
        type: 'danger',
      });
      return;
    }
    setLoading(true);
    const errorMessage = await UserService.changePassword({
      newPassword,
      password: oldPassword,
    });
    setLoading(false);
    showMessage({
      message: errorMessage || 'Đổi mật khẩu thành công',
      type: !!errorMessage ? 'danger' : 'success',
    });
  }, [oldPassword, newPassword, confirmNewPassword]);

  return {
    oldPassword,
    newPassword,
    confirmNewPassword,
    loading,
    setNewPassword,
    setOldPassword,
    setConfirmNewPassword,
    submit,
  };
}
