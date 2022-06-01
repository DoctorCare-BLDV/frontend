import React, {useMemo} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';

import {Image, TextView} from '@app/framework/native/components';
import {Colors, Layout} from '@app/resources';
// import {hexToRgba} from '@app/utils';
import {useTheme} from '@app/shared/hooks';

import SVGFileCancel from '@app/resources/media/file-cancel.svg';
import SVGFileSuccess from '@app/resources/media/file-success.svg';
import SVGBullHorn from '@app/resources/media/bull-horn.svg';
import SVGTruckFast from '@app/resources/media/truck-fast.svg';
import SVGBox from '@app/resources/media/box.svg';
import SVGFile from '@app/resources/media/file.svg';
import {NotificationType, ORDER_STATUS} from '@data/models';

export interface NotificationItemProps {
  id?: number;
  title?: string;
  image?: string;
  isUnread?: boolean;
  type?: NotificationType;
  status?: ORDER_STATUS;
  onPress?: () => void;
}

export const NotificationItem: React.FC<NotificationItemProps> = ({
  image,
  title,
  isUnread,
  type,
  status,
  onPress,
}) => {
  const theme = useTheme();
  const containerBaseStyle = useMemo(() => {
    return [
      styles.container,
      {
        borderColor: theme.colorScheme.border,
      },
      !!isUnread &&
        {
          // backgroundColor: hexToRgba(theme.colorScheme.primary, 0.1),
        },
    ];
  }, [isUnread, theme]);

  const icon = useMemo(() => {
    switch (type) {
      case NotificationType.ORDER:
        switch (status) {
          case ORDER_STATUS.CANCEL:
            return <SVGFileCancel fill="#7f7f7f" style={styles.icon} />;
          case ORDER_STATUS.CONFIRMING:
            return <SVGFile fill="#FBCA03" style={styles.icon} />;
          case ORDER_STATUS.TAKING:
            return <SVGBox fill="#FBCA03" style={styles.icon} />;
          case ORDER_STATUS.DELIVERING:
            return <SVGTruckFast fill="#FBCA03" style={styles.icon} />;
          case ORDER_STATUS.COMPLETED:
            return <SVGFileSuccess fill="#369F4D" style={styles.icon} />;
          case ORDER_STATUS.FAILURE:
            return <SVGFileCancel fill="#7f7f7f" style={styles.icon} />;
          default:
            return null;
        }
      case NotificationType.REVENUE:
        return <SVGBullHorn fill="#F25A5F" style={styles.icon} />;
      default:
        return null;
    }
  }, [type, status]);

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={containerBaseStyle}>
      {image ? <Image source={{uri: image}} style={styles.image} /> : icon}
      <TextView style={styles.title}>{title}</TextView>
      {isUnread && <View style={styles.badge} />}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: Layout.spacingHorizontal,
    paddingVertical: 20,
    borderBottomWidth: 0.5,
  },
  image: {
    width: 70,
    height: 70,
    marginRight: 10,
  },
  title: {
    flex: 1,
  },
  icon: {
    marginRight: 10,
    maxWidth: 30,
    maxHeight: 30,
  },
  badge: {
    position: 'absolute',
    width: 8,
    height: 8,
    backgroundColor: Colors.RED,
    borderRadius: 10,
    right: 10,
    top: 8,
  },
});
