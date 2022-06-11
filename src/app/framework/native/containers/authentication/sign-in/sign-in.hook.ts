import {useUser} from '@app/shared/contexts';
import {validatePhone} from '@app/utils';
import {useCallback, useRef, useState} from 'react';
import {} from 'react-native';
import {showMessage} from 'react-native-flash-message';

export function useSignInModel() {
  const phone = useRef('');
  const password = useRef('');
  const [loading, setLoading] = useState<boolean>(false);
  const {signIn} = useUser();
  const onSubmit = useCallback(async () => {
    if (!phone.current || !password.current) {
      return showMessage({
        message: 'Vui lòng nhập số điện thoại và mật khẩu',
        type: 'warning',
      });
    }
    const {message, result} = validatePhone(phone.current);
    if (!result) {
      return showMessage({
        message: message,
        type: 'warning',
      });
    }
    setLoading(true);
    await signIn({
      phone: phone.current,
      password: password.current,
    });
    setLoading(false);
  }, [signIn]);

  return {
    phone,
    loading,
    password,
    onSubmit,
  };
}
