import {AxiosInstance} from 'axios';

import {
  ApiRequestor,
  GetAllNotificationAPIRequest,
  GetAllNotificationAPIResponse,
} from '@data/models';

export class NotificationApiService {
  constructor(private readonly provider: AxiosInstance) {}

  getAllNotifications(
    body: GetAllNotificationAPIRequest,
  ): ApiRequestor<GetAllNotificationAPIResponse> {
    const controller = new AbortController();

    return {
      cancel: () => controller.abort(),
      request: () =>
        this.provider.post('/public/notify/getAll/', body, {
          signal: controller.signal,
        }),
    };
  }
}
