import {useUser} from '@app/shared/contexts';
import {checkValidEmail} from '@app/utils';
import {useCallback, useRef, useState} from 'react';
import {} from 'react-native';
import {showMessage} from 'react-native-flash-message';

export function useEditProfileModel() {
  const {user, updateProfile} = useUser();
  const [loading, setLoading] = useState<boolean>(false);
  const name = useRef(user?.fullName || '');
  const address = useRef(user?.address || '');
  const email = useRef(user?.email || '');
  const bankAccount = useRef(user?.bankAccount || '');
  const bankName = useRef(user?.bankName || '');

  const onSubmit = useCallback(async () => {
    if (!address.current || !email.current || !name.current) {
      return showMessage({
        message: 'Vui lòng điền đủ thông tin yêu cầu!',
        type: 'warning',
      });
    }
    if (!!bankAccount.current && !bankName.current) {
      return showMessage({
        message: 'Vui lòng nhập tên ngân hàng!',
        type: 'warning',
      });
    }
    if (!bankAccount.current && !!bankName.current) {
      return showMessage({
        message: 'Vui lòng nhập số tài khoản ngân hàng!',
        type: 'warning',
      });
    }
    if (!checkValidEmail(email.current)) {
      return showMessage({
        message: 'Email không hợp lệ',
        type: 'warning',
      });
    }
    setLoading(true);
    await updateProfile({
      address: address.current,
      bankAccount: bankAccount.current,
      bankName: bankName.current,
      fullName: name.current,
      email: email.current,
    });
    setLoading(false);
  }, [updateProfile]);

  return {
    name,
    address,
    bankAccount,
    bankName,
    onSubmit,
    user,
    email,
    loading,
  };
}
