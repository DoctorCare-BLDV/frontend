import React, {Dispatch, SetStateAction} from 'react';

import {NotificationModel} from '@data/models';

import {
  GetNotificationListHookOptions,
  MarkReadAllNotificationHookOptions,
  ReadDetailNotificationHookOptions,
} from './notifications.context-provider';

export type NotificationsContextState = {
  notificationList: NotificationModel[];
  totalUnread: number;
  getNotificationList: (options: GetNotificationListHookOptions) => void;
  setNotificationList: Dispatch<SetStateAction<NotificationModel[]>>;
  readDetailNotification: (options: ReadDetailNotificationHookOptions) => void;
  markReadAllNotification: (
    options?: MarkReadAllNotificationHookOptions,
  ) => void;
};

export const INITIAL_VALUE: NotificationsContextState = {
  notificationList: [],
  totalUnread: 0,
  setNotificationList: () => {},
  getNotificationList: () => {},
  readDetailNotification: () => {},
  markReadAllNotification: () => {},
};

export const NotificationsContext =
  React.createContext<NotificationsContextState>(INITIAL_VALUE);
