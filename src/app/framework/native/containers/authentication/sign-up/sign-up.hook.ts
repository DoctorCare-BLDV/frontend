import {useCallback, useRef, useState} from 'react';
import {Alert, Linking} from 'react-native';
import {showMessage} from 'react-native-flash-message';
import {checkValidEmail, validatePhone} from '@app/utils';
import {AuthenticationService} from '@app/framework/native/infrastructure';
import {SignUpProps} from './sign-up.type';

export function useSignUpModel(props: SignUpProps) {
  const phone = useRef('');
  const name = useRef('');
  const email = useRef('');
  const refCode = useRef('DCMANAGER');
  const [loading, setLoading] = useState<boolean>(false);

  const openPolicyLink = useCallback(() => {
    try {
      Linking.openURL('http://www.doctorcare.info/');
    } catch (error) {}
  }, []);

  const onSubmit = useCallback(async () => {
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
    setLoading(true);
    const error = await AuthenticationService.register({
      email: email.current,
      fullName: name.current,
      introCode: refCode.current,
      phone: phone.current,
    });
    setLoading(false);
    if (!!error) {
      return showMessage({
        message: error,
        type: 'danger',
      });
    }

    Alert.alert(
      'Đăng kí thành công',
      'Admin sẽ review và gửi thông tin tài khoản qua email cho bạn!',
      [
        {
          text: 'Đã hiểu',
          onPress: () => props.navigation.pop(),
        },
      ],
    );
  }, [props.navigation]);
  return {
    phone,
    name,
    email,
    refCode,
    onSubmit,
    loading,
    openPolicyLink,
  };
}
