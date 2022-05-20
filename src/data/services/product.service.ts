import {AxiosInstance} from 'axios';

import {
  ApiRequestor,
  GetProductListAPIRequest,
  GetProductListAPIResponse,
} from '@data/models';

export class ProductApiService {
  constructor(private readonly provider: AxiosInstance) {}

  getProductList(
    body: GetProductListAPIRequest,
  ): ApiRequestor<GetProductListAPIResponse> {
    const controller = new AbortController();

    return {
      cancel: () => controller.abort(),
      request: () =>
        this.provider.post('/public/product/getAll', body, {
          signal: controller.signal,
        }),
    };
  }
}
