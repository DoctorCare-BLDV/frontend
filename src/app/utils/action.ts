import {Linking} from 'react-native';
import {showMessage} from 'react-native-flash-message';
import Clipboard from '@react-native-clipboard/clipboard';
import messaging from '@react-native-firebase/messaging';

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

export async function requestNoticationPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  return enabled;
}
