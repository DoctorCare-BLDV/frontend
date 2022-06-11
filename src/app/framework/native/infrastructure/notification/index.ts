import messaging from '@react-native-firebase/messaging';
import {showMessage} from 'react-native-flash-message';
import {FirebaseService} from '../services';

const notification = messaging();

export const notificationConfiguration = async () => {
  FirebaseService.updateFcmToken();
  notification.onMessage(mess => {
    console.log('in app notification', mess);
    showMessage({
      message: mess.data?.message + '',
      type: 'info',
    });
  });
  notification.onNotificationOpenedApp(mess => {
    console.log('on app opened', mess);
  });
  const init = await notification.getInitialNotification();
  if (init) {
    console.log('click notify to opened app', init);
  }
  notification.onTokenRefresh(async token => {
    FirebaseService.updateFcmToken(token);
  });
};
