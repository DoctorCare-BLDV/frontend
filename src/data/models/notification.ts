import {AxiosResponse} from 'axios';

export type GetAllNotificationAPIRequest = {
  filterValues?: Object;
  pageIndex: number;
  pageSize?: number;
  sortValues?: Object;
};

export type GetAllNotificationAPIResponse = AxiosResponse<{
  content: any;
  message: string;
  status: number;
}>;

export type NotificationModel = {};
