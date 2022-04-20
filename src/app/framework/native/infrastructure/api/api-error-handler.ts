import {AxiosError, AxiosInstance, AxiosResponse} from 'axios';
import {ApiErrorHandler} from '@core';
export class AxiosApiErrorHandler {
  constructor(
    private readonly client: AxiosInstance,
    private readonly listener: ApiErrorHandler,
  ) {
    this.bootstrap.bind(this);
    this.onFulfilled.bind(this);
    this.onError.bind(this);
  }

  private bootstrap() {
    this.client.interceptors.response.use(this.onFulfilled, this.onError);
  }
  private onFulfilled(response: AxiosResponse) {
    return response;
  }
  private onError(error: AxiosError) {
    if (error.request) {
      this.listener.onRequestError();
    }
    return Promise.reject(error);
  }
}
