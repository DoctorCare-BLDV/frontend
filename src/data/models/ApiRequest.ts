export interface ApiRequestor<T> {
  cancel: () => void;
  request: () => Promise<T>;
}

class ApiRequest<T> {
  id = -1;
  cancel: () => void = () => {};
  request: () => Promise<T> | void = () => {};

  constructor(data?: ApiRequestor<T>) {
    this.id = new Date().getTime();
    if (data?.cancel) {
      this.cancel = data.cancel;
    }
    if (data?.request) {
      this.request = data?.request;
    }
  }

  updateData({cancel, request}: ApiRequestor<T>) {
    this.updateCancel(cancel);
    this.updateRequest(request);
  }

  updateCancel(cancel: () => void) {
    this.cancel = cancel;
  }

  updateRequest(request: () => Promise<T>) {
    this.request = request;
  }
}

export {ApiRequest};
