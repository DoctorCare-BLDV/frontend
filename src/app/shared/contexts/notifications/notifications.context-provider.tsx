import React, {useCallback, useEffect, useRef, useState} from 'react';

import {GetListHookOptions} from '@app/framework/native/hooks';
import {NotificationService} from '@app/framework/native/infrastructure';
import {HTTPS_ERROR_MESSAGE, HTTPS_SUCCESS_STATUS} from '@app/resources';
import {showFlashMessage} from '@app/utils';
import {
  ApiRequest,
  GetAllNotificationAPIRequest,
  GetAllNotificationAPIResponse,
  NotificationModel,
} from '@data/models';

import {NotificationsContext} from './notifications.context';

const MIN_PAGE_INDEX = 0;
const PAGE_SIZE = 3;

export interface GetNotificationListHookOptions extends GetListHookOptions {
  data?: GetAllNotificationAPIRequest;
  dataFormatter?: (items: NotificationModel[]) => any;
}

export type Notification = {};

export const NotificationsContextProvider: React.FC = ({children}) => {
  const [getNotificationListRequest] = useState(
    new ApiRequest<GetAllNotificationAPIResponse>(),
  );

  const canLoadMore = useRef(true);
  const isRequesting = useRef(false);
  const pageIndex = useRef(MIN_PAGE_INDEX);
  const pageSize = useRef(PAGE_SIZE);
  const [totalUnread, setTotalUnread] = useState(0);
  const currentOptions = useRef<GetNotificationListHookOptions>({});

  const [notificationList, setNotificationList] = useState<NotificationModel[]>(
    [],
  );

  const formatOptions = useCallback(
    (customOptions: GetNotificationListHookOptions = {}) => {
      return {
        isLoadMore: false,
        isRefreshing: false,
        onBeforeRequest: () => {},
        onEndRequest: () => {},
        onRequestSuccess: () => {},
        onRequestError: () => {},
        ...customOptions,

        data: {
          pageIndex: pageIndex.current,
          // pageSize: pageSize.current,
          ...(customOptions.data || {}),
        },
      };
    },
    [],
  );

  const executeSuccessRequest = useCallback(
    (notificationListData, options: GetNotificationListHookOptions = {}) => {
      setNotificationList(previousNotifications => {
        if (options.isLoadMore) {
          return previousNotifications.concat(notificationListData || []);
        } else {
          return options.isRefreshing || !!notificationListData?.length
            ? notificationListData
            : previousNotifications;
        }
      });
    },
    [],
  );

  const getNotificationList = useCallback(
    async (customOptions: GetNotificationListHookOptions = {}) => {
      currentOptions.current = customOptions;
      if (customOptions.isRefreshing) {
        getNotificationListRequest.cancel();
        pageIndex.current = MIN_PAGE_INDEX;
        isRequesting.current = false;
        customOptions.isLoadMore = false;
      }

      const options = formatOptions(customOptions);

      if (isRequesting.current) {
        options.onEndRequest();
        return;
      }

      if (options.isLoadMore) {
        if (canLoadMore.current) {
          pageIndex.current++;
          options.data.pageIndex = pageIndex.current;
        } else {
          options.onEndRequest();
          return;
        }
      }

      isRequesting.current = true;
      let isLoadMoreFail = false;

      try {
        options.onBeforeRequest();
        getNotificationListRequest.updateData(
          NotificationService.getAllNotifications(options.data),
        );
        const response = await getNotificationListRequest.request();
        console.log(response);
        options.onRequestSuccess(response);

        isLoadMoreFail = response?.status !== HTTPS_SUCCESS_STATUS;
        canLoadMore.current = !!response?.data?.content?.hasNext;

        if (response && response.status === HTTPS_SUCCESS_STATUS) {
          executeSuccessRequest(
            response?.data?.content?.content || [],
            options,
          );

          setTotalUnread(response?.data?.content?.totalUnRead || 0);

          // return response?.data?.content?.inventory;
        } else {
          showFlashMessage({
            type: 'danger',
            message: response?.data?.message || HTTPS_ERROR_MESSAGE,
          });
        }
      } catch (error: any) {
        isLoadMoreFail = true;

        options.onRequestError(error);

        console.log('err_get_list_post', error);
        showFlashMessage({
          type: 'danger',
          message: error?.message || HTTPS_ERROR_MESSAGE,
        });
      } finally {
        isRequesting.current = false;

        if (isLoadMoreFail) {
          pageIndex.current =
            pageIndex.current <= MIN_PAGE_INDEX
              ? MIN_PAGE_INDEX
              : pageIndex.current - 1;
        }

        options.onEndRequest();
      }
    },
    [getNotificationListRequest, formatOptions, executeSuccessRequest],
  );

  useEffect(() => {
    return () => {
      getNotificationListRequest.cancel();
      isRequesting.current = false;
      pageIndex.current = MIN_PAGE_INDEX;
      pageSize.current = PAGE_SIZE;
    };
  }, [getNotificationListRequest]);

  return (
    <NotificationsContext.Provider
      value={{
        notificationList,
        getNotificationList,
        totalUnread,
      }}>
      {children}
    </NotificationsContext.Provider>
  );
};
