import {useCallback, useEffect, useState} from 'react';

import {useNotifications} from '@app/shared/contexts';

export function useNotificationListModel() {
  const {notificationList, getNotificationList} = useNotifications();

  const [isLoading, setLoading] = useState(false);
  const [isLoadMore, setLoadMore] = useState(false);
  const [isRefreshing, setRefreshing] = useState(false);

  const handleEndRequest = useCallback(() => {
    setLoadMore(false);
    setRefreshing(false);
    setLoading(false);
  }, []);

  useEffect(() => {
    setLoading(true);
    getNotificationList({
      isRefreshing: true,
      onEndRequest: handleEndRequest,
    });
  }, [getNotificationList, handleEndRequest]);

  const handleLoadMore = useCallback(() => {
    getNotificationList({
      isLoadMore: true,
      onBeforeRequest: () => setLoadMore(true),
      onEndRequest: handleEndRequest,
    });
  }, [handleEndRequest, getNotificationList]);

  const handleRefresh = useCallback(() => {
    setRefreshing(true);

    getNotificationList({
      isRefreshing: true,
      onEndRequest: handleEndRequest,
    });
  }, [getNotificationList, handleEndRequest]);

  return {
    notificationList,
    getNotificationList,
    isLoading,
    isLoadMore,
    isRefreshing,
    handleLoadMore,
    handleRefresh,
  };
}
