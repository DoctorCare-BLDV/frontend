import {useCallback, useMemo, useState} from 'react';
import {} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {showMessage} from 'react-native-flash-message';
import {AuthenticationService} from '@app/framework/native/infrastructure';

export function useForgotPasswordModel() {
  const [loading, setLoading] = useState(false);
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const navigation = useNavigation();

  const submit = useCallback(async () => {
    setLoading(true);
    const errorMessage = await AuthenticationService.forgotPass({
      phone,
      email,
    });
    setLoading(false);
    if (!errorMessage) {
      navigation.goBack();
      showMessage({
        message: 'Reset mật khẩu thành công!',
        type: 'success',
      });
      return;
    }
    showMessage({
      message: errorMessage,
      type: 'danger',
    });
  }, [phone, email, navigation]);

  const isDisabled = useMemo(() => {
    return !phone || !email;
  }, [phone, email]);

  return {loading, phone, email, setPhone, setEmail, submit, isDisabled};
}
