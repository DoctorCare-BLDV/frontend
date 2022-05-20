import {AxiosInstance} from 'axios';

import {
  ApiRequestor,
  GetAllItemAPIRequest,
  GetAllItemAPIResponse,
} from '@data/models';

export class ItemApiService {
  constructor(private readonly provider: AxiosInstance) {}

  getAllItemByCategoryCode({
    categoryCode,
  }: GetAllItemAPIRequest): ApiRequestor<GetAllItemAPIResponse> {
    const controller = new AbortController();

    return {
      cancel: () => controller.abort(),
      request: () =>
        this.provider.post(
          '/public/item/getItemByCategoryCode/' + categoryCode,
          {},
          {
            signal: controller.signal,
          },
        ),
    };
  }
}
