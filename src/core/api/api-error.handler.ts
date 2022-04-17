export interface ApiErrorHandler {
  onUnAuthorized: () => void;
  onRequestTimeOut: () => void;
  onRequestError: () => void;
}
