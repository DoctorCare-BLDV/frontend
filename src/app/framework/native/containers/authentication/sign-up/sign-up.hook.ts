import {useCallback, useRef} from 'react';
import {} from 'react-native';
import {showMessage} from 'react-native-flash-message';
import {checkValidEmail, validatePhone} from '@app/utils';

export function useSignUpModel() {
  const phone = useRef('');
  const name = useRef('');
  const email = useRef('');
  const refCode = useRef('DCMANAGER');

  const onSubmit = useCallback(() => {
    if (!phone.current || !name.current || !refCode.current || !email.current) {
      return showMessage({
        message: 'Vui lòng điền đầy đủ thông tin',
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
    if (!checkValidEmail(email.current)) {
      return showMessage({
        message: 'Email không hợp lệ',
        type: 'warning',
      });
    }
  }, []);
  return {
    phone,
    name,
    email,
    refCode,
    onSubmit,
  };
}
