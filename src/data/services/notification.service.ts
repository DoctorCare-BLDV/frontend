import {AxiosInstance} from 'axios';

import {
  ApiRequestor,
  GetAllNotificationAPIRequest,
  GetAllNotificationAPIResponse,
  ReadAllNotificationAPIResponse,
  ReadDetailNotificationAPIRequest,
  ReadDetailNotificationAPIResponse,
} from '@data/models';

export class NotificationApiService {
  constructor(private readonly provider: AxiosInstance) {}

  getAll(
    body: GetAllNotificationAPIRequest,
  ): ApiRequestor<GetAllNotificationAPIResponse> {
    const controller = new AbortController();

    return {
      cancel: () => controller.abort(),
      request: () =>
        this.provider.post('/public/notify/getAll', body, {
          signal: controller.signal,
        }),
    };
  }

  readDetail(
    body: ReadDetailNotificationAPIRequest,
  ): ApiRequestor<ReadDetailNotificationAPIResponse> {
    const controller = new AbortController();

    return {
      cancel: () => controller.abort(),
      request: () =>
        this.provider.post(
          '/public/notify/readDetail?notifyId=' + body.notifyId,
          {},
          {
            signal: controller.signal,
          },
        ),
    };
  }

  readAll(): ApiRequestor<ReadAllNotificationAPIResponse> {
    const controller = new AbortController();

    return {
      cancel: () => controller.abort(),
      request: () =>
        this.provider.post(
          '/public/notify/readAll',
          {},
          {
            signal: controller.signal,
          },
        ),
    };
  }
}
