import {useUser} from '@app/shared/contexts';
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
    if (
      !address.current ||
      !bankAccount.current ||
      !bankName.current ||
      !email.current ||
      !name.current
    ) {
      return showMessage({
        message: 'Vui lòng điền đủ thông tin yêu cầu!',
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
