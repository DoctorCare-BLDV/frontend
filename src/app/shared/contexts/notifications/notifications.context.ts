import React from 'react';

import {NotificationModel} from '@data/models';

import {GetNotificationListHookOptions} from './notifications.context-provider';

export type NotificationsContextState = {
  notificationList: NotificationModel[];
  totalUnread: number;
  getNotificationList: (options: GetNotificationListHookOptions) => void;
};

export const INITIAL_VALUE: NotificationsContextState = {
  notificationList: [],
  totalUnread: 0,
  getNotificationList: () => {},
};

export const NotificationsContext =
  React.createContext<NotificationsContextState>(INITIAL_VALUE);
