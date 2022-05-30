import React from 'react';
import {NotificationsContext} from './notifications.context';

export function useNotifications() {
  const {notificationList, getNotificationList, totalUnread} =
    React.useContext(NotificationsContext);
  return {
    notificationList,
    totalUnread,
    getNotificationList,
  };
}
