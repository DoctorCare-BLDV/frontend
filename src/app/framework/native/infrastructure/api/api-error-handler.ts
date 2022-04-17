import {AxiosError, AxiosInstance, AxiosRequestConfig} from 'axios';
import {ApiErrorHandler} from '@core';
export class AxiosApiErrorHandler {
  constructor(
    private readonly client: AxiosInstance,
    private readonly listener: ApiErrorHandler,
  ) {
    this.bootstrap.bind(this);
    this.onRequest.bind(this);
    this.onError.bind(this);
  }

  private bootstrap() {
    this.client.interceptors.response.use(this.onRequest, this.onError);
  }
  private onRequest(request: AxiosRequestConfig) {
    return request;
  }
  private onError(error: AxiosError) {
    if (error.request) {
      this.listener.onRequestError();
    }
    return Promise.reject(error);
  }
}
