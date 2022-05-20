import React, {useCallback, useMemo} from 'react';
import {FlatList} from 'react-native';
// import from library
import {useSafeAreaInsets} from 'react-native-safe-area-context';
// localImport
import {useNotificationsModel} from './notifications.hook';
import {NotificationsProps} from './notifications.type';
import {NotificationItem, NotificationItemProps} from './notification-item';

const _Notifications: React.FC<NotificationsProps> = props => {
  const {} = props;
  const {} = useNotificationsModel();
  const {bottom} = useSafeAreaInsets();

  const listContentContainerStyle = useMemo(() => {
    return {
      paddingBottom: bottom,
    };
  }, [bottom]);

  const keyExtractor = useCallback(
    (item, index) => String(item.id || index),
    [],
  );

  const renderNotification = ({
    item: notification,
  }: {
    item: NotificationItemProps;
  }) => {
    return (
      <NotificationItem title={notification.title} image={notification.image} />
    );
  };

  return (
    <>
      <FlatList
        data={NOTIFICATIONS}
        contentContainerStyle={listContentContainerStyle}
        renderItem={renderNotification}
        keyExtractor={keyExtractor}
      />
    </>
  );
};

export const Notifications = React.memo(_Notifications);

const NOTIFICATIONS = [
  {
    id: 1,
    image:
      'https://gamek.mediacdn.vn/133514250583805952/2020/8/6/rtd1-1596712458074488543564.jpg',
    title:
      'Đơn hàng của khách hàng Nguyễn Văn Anh đã được lên thành công, vui lòng chờ xác nhận.',
  },
  {
    id: 2,
    image:
      'https://gamek.mediacdn.vn/133514250583805952/2020/7/11/narutossagemode-15944657133061535033027.png',
    title:
      'Đơn hàng của khách hàng Nguyễn Thị Ngọc Ánh đã được xác nhận và đóng gói.',
  },
  {
    id: 3,
    image:
      'https://gamingnews.cyou/img/1647517581_The-new-chapter-of-One-Piece-shows-the-awakening-of.jpg',
    title: 'Đơn hàng của khách hàng Nguyễn Thị An đang được vận chuyển.',
  },
  {
    id: 4,
    image:
      'https://i.pinimg.com/474x/8d/1f/b1/8d1fb16c29e57201145e585be2a30710.jpg',
    title: 'Đơn hàng của khách hàng Nguyễn Văn Ngọc đã giao thất bại.',
  },
  {
    id: 5,
    image:
      'https://gamingnews.cyou/img/1647517581_The-new-chapter-of-One-Piece-shows-the-awakening-of.jpg',
    title: 'Đơn hàng của khách hàng Nguyễn Thị An đang được vận chuyển.',
  },
  {
    id: 6,
    image:
      'https://i.pinimg.com/474x/8d/1f/b1/8d1fb16c29e57201145e585be2a30710.jpg',
    title: 'Đơn hàng của khách hàng Nguyễn Văn Ngọc đã giao thất bại.',
  },
  {
    id: 7,
    image:
      'https://gamingnews.cyou/img/1647517581_The-new-chapter-of-One-Piece-shows-the-awakening-of.jpg',
    title: 'Đơn hàng của khách hàng Nguyễn Thị An đang được vận chuyển.',
  },
  {
    id: 8,
    image:
      'https://i.pinimg.com/474x/8d/1f/b1/8d1fb16c29e57201145e585be2a30710.jpg',
    title: 'Đơn hàng của khách hàng Nguyễn Văn Ngọc đã giao thất bại.',
  },
  {
    id: 9,
    image:
      'https://gamingnews.cyou/img/1647517581_The-new-chapter-of-One-Piece-shows-the-awakening-of.jpg',
    title: 'Đơn hàng của khách hàng Nguyễn Thị An đang được vận chuyển.',
  },
  {
    id: 10,
    image:
      'https://i.pinimg.com/474x/8d/1f/b1/8d1fb16c29e57201145e585be2a30710.jpg',
    title: 'Đơn hàng của khách hàng Nguyễn Văn Ngọc đã giao thất bại.',
  },
];
