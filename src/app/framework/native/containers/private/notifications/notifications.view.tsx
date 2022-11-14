import React, {useCallback, useEffect, useMemo} from 'react';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
// import from library
import {useSafeAreaInsets} from 'react-native-safe-area-context';
// localImport
import {NotificationsProps} from './notifications.type';
import {NotificationItem} from './notification-item';
import {NotificationModel, NotificationType} from '@data/models';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {TextView} from '@app/framework/native/components';
import {Colors, Layout} from '@app/resources';
import {useTheme} from '@app/shared/hooks';
import {useNotificationListModel} from './notifications.hook';
import {getStatusBarHeight} from 'react-native-iphone-x-helper';

const MESSAGES = {
  NO_RESULT: 'Chưa có thông báo!',
};

const styles = StyleSheet.create({
  emptyWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyIcon: {
    fontSize: 70,
    color: Colors.DIM_BLACK,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: Layout.spacingVertical,
    color: Colors.DIM_BLACK,
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 30,
  },
  safeArea: {
    marginTop: getStatusBarHeight(true) + 15,
  },
  checkAllIcon: {
    fontSize: 25,
  },
  listContentContainer: {
    flexGrow: 1,
  },
  checkAllLoading: {
    position: 'absolute',
  },
});

const _Notifications: React.FC<NotificationsProps> = ({navigation}) => {
  const {
    notificationList,
    isLoadingMarkReadAll,
    isLoading,
    isLoadMore,
    isRefreshing,
    handleLoadMore,
    handleRefresh,
    readDetailNotification,
    markReadAllNotification,
  } = useNotificationListModel();

  const renderReadAll = useCallback(
    props => {
      const iconStyle = {
        color: props.tintColor,
        opacity: isLoadingMarkReadAll ? 0 : 1,
      };
      return (
        <TouchableOpacity
          disabled={isLoadingMarkReadAll}
          onPress={() => markReadAllNotification()}>
          <MaterialCommunityIcons
            name="check-all"
            style={[styles.checkAllIcon, iconStyle]}
          />
          {isLoadingMarkReadAll && (
            <ActivityIndicator
              size={'small'}
              color={props.tintColor}
              style={styles.checkAllLoading}
            />
          )}
        </TouchableOpacity>
      );
    },
    [markReadAllNotification, isLoadingMarkReadAll],
  );

  useEffect(() => {
    navigation.setOptions({
      headerRight: renderReadAll,
    });
  }, [navigation, renderReadAll]);

  const {bottom} = useSafeAreaInsets();
  const theme = useTheme();

  const emptyTitleStyle = useMemo(() => {
    return [
      styles.emptyTitle,
      {
        color: theme.textColorScheme.secondary,
      },
    ];
  }, [theme]);

  const listContentContainerStyle = useMemo(() => {
    return [
      styles.listContentContainer,
      {
        paddingBottom: bottom,
      },
    ];
  }, [bottom]);

  const handlePressNotification = useCallback(
    notification => {
      const data = {
        notifyId: notification.orderNotifyId,
      };
      readDetailNotification({
        data,
      });

      if (notification.forwardTo === NotificationType.ORDER) {
        !!notification.businessId &&
          navigation.navigate('OrderDetail', {
            id: notification.businessId,
          });
      } else if (notification.forwardTo === NotificationType.REVENUE) {
        navigation.navigate('Revenue');
      } else if (
        !notification.forwardTo &&
        !!notification.content &&
        !!notification.description
      ) {
        navigation.navigate('NotificationDetail', {
          content: notification.content,
          description: notification.description,
          createAt: notification.createAt,
          title: notification.title,
          img: notification.fileAttach,
        });
      }
    },
    [readDetailNotification, navigation],
  );

  const renderListEmpty = useCallback(() => {
    if (isLoading) {
      return null;
    }

    return (
      <View style={styles.emptyWrapper}>
        <FontAwesome5Icon name="bell-slash" style={styles.emptyIcon} />
        <TextView style={emptyTitleStyle}>{MESSAGES.NO_RESULT}</TextView>
      </View>
    );
  }, [isLoading, emptyTitleStyle]);

  const renderLoadMore = useCallback(() => {
    if (!isLoadMore) {
      return null;
    }

    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="small" />
      </View>
    );
  }, [isLoadMore]);

  const renderNotification = ({
    item: notification,
  }: {
    item: NotificationModel;
  }) => {
    return (
      <NotificationItem
        isSystemNoti={!notification.forwardTo}
        title={notification.title}
        description={notification.description}
        content={notification.content}
        isUnread={!notification.isRead}
        type={notification.forwardTo}
        status={notification.newStatus}
        onPress={() => handlePressNotification(notification)}
      />
    );
  };

  const keyExtractor = useCallback(
    (item, index) => String(item.id || index),
    [],
  );

  const renderHeaderComponent = useCallback(() => {
    return <View style={styles.safeArea} />;
  }, []);

  return (
    <FlatList
      data={notificationList}
      contentContainerStyle={listContentContainerStyle}
      ListHeaderComponent={renderHeaderComponent}
      renderItem={renderNotification}
      keyExtractor={keyExtractor}
      ListEmptyComponent={renderListEmpty}
      ListFooterComponent={renderLoadMore}
      scrollEventThrottle={16}
      onEndReachedThreshold={0.4}
      onEndReached={handleLoadMore}
      refreshControl={
        <RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />
      }
    />
  );
};

export const Notifications = React.memo(_Notifications);
