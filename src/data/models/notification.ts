import {AxiosResponse} from 'axios';

export enum NotificationType {
  ORDER = 'ORDER',
}

export type GetAllNotificationAPIRequest = {
  filterValues?: Object;
  pageIndex: number;
  pageSize?: number;
  sortValues?: Object;
};

export type GetAllNotificationAPIResponse = AxiosResponse<{
  content: {
    content: NotificationModel[];
    pageIndex: number;
    pageSize: number;
    totalPages: number;
    totalUnRead: number;
    totalRows: number;
    hasNext: boolean;
    hasPrevious: boolean;
  };
  message: string;
  status: number;
}>;

export type NotificationModel = {
  orderNotifyId: number;
  toUser: number;
  orderId: number;
  oldStatus: number;
  newStatus: number;
  content: string;
  createAt: number;
  isRead: boolean | null;
  forwardTo: NotificationType;
};
