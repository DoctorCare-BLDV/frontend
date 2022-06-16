import {NotificationType} from '@data/models';
import messaging from '@react-native-firebase/messaging';
import {NavigationProp} from '@react-navigation/native';
import {showMessage} from 'react-native-flash-message';
import {FirebaseService} from '../services';

const fbMessaging = messaging();

export const notificationConfiguration = async (
  navigation: NavigationProp<any>,
) => {
  FirebaseService.updateFcmToken();

  const handleNotificationOnPress = (notification: any, pressed?: boolean) => {
    let screen = '';
    let params: any = {};

    if (notification.forwardTo === NotificationType.ORDER) {
      screen = 'OrderDetail';
      params = {id: notification.orderId};
    }
    if (notification.forwardTo === NotificationType.REVENUE) {
      screen = 'Revenue';
    }
    if (pressed && !!screen) {
      return navigation.navigate(screen, params);
    }
    showMessage({
      message: notification.title + '',
      type: 'info',
      onPress: () => (!screen ? {} : navigation.navigate(screen, params)),
    });
  };

  fbMessaging.onMessage(mess => {
    if (!mess.notification?.body) {
      return;
    }
    const notification = JSON.parse(mess.notification?.body);
    if (!notification?.forwardTo) {
      return;
    }
    handleNotificationOnPress({
      ...notification,
      title: mess?.notification?.title || '',
    });
  });

  fbMessaging.onNotificationOpenedApp(mess => {
    if (!mess.notification?.body) {
      return;
    }
    const notification = JSON.parse(mess.notification?.body);
    if (!notification?.forwardTo) {
      return;
    }
    handleNotificationOnPress({
      ...notification,
      title: mess?.notification?.title || '',
    });
  });

  fbMessaging.onTokenRefresh(async token => {
    FirebaseService.updateFcmToken(token);
  });

  const mess = await fbMessaging.getInitialNotification();
  if (mess) {
    if (!mess.notification?.body) {
      return;
    }
    const notification = JSON.parse(mess.notification?.body);
    if (!notification?.forwardTo) {
      return;
    }
    handleNotificationOnPress(
      {
        ...notification,
        title: mess?.notification?.title || '',
      },
      true,
    );
  }
};
