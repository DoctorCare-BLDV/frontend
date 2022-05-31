import React from 'react';
import {NotificationsContext} from './notifications.context';

export function useNotifications() {
  const {
    notificationList,
    totalUnread,
    setNotificationList,
    getNotificationList,
    readDetailNotification,
    markReadAllNotification,
  } = React.useContext(NotificationsContext);
  return {
    notificationList,
    totalUnread,
    setNotificationList,
    getNotificationList,
    readDetailNotification,
    markReadAllNotification,
  };
}
