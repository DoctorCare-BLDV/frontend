import {useUser} from '@app/shared/contexts';
import {useCallback, useRef} from 'react';
import {} from 'react-native';
import {showMessage} from 'react-native-flash-message';

export function useSignInModel() {
  const phone = useRef('');
  const password = useRef('');
  const {signIn} = useUser();
  const onSubmit = useCallback(async () => {
    if (!phone.current || !password.current) {
      return showMessage({
        message: 'Vui lòng nhập số điện thoại và mật khẩu',
        type: 'warning',
      });
    }
    signIn({
      phone: phone.current,
      password: password.current,
    });
  }, [signIn]);

  return {
    phone,
    password,
    onSubmit,
  };
}
