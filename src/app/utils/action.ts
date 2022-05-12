import {Linking} from 'react-native';
import {showMessage} from 'react-native-flash-message';
import Clipboard from '@react-native-clipboard/clipboard';

export const callPhone = (phone: string) => {
  Linking.canOpenURL('tel:' + phone).then(supported => {
    if (supported) Linking.openURL('tel:' + phone);
  });
};

export const copyText = (text: string) => {
  Clipboard.setString(text);
  showMessage({
    message: 'Đã sao chép thành công',
    type: 'info',
  });
};
