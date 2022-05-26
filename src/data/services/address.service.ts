import {AxiosInstance} from 'axios';

import {
  ApiRequestor,
  GetAddressListAPIRequest,
  GetAddressListAPIResponse,
} from '@data/models';

export class AddressApiService {
  constructor(private readonly provider: AxiosInstance) {}

  getAddress(
    body: GetAddressListAPIRequest,
  ): ApiRequestor<GetAddressListAPIResponse> {
    const controller = new AbortController();

    return {
      cancel: () => controller.abort(),
      request: () =>
        this.provider.get(
          'https://provinces.open-api.vn/api/?depth=' + body.type,
          {
            signal: controller.signal,
          },
        ),
    };
  }
}
