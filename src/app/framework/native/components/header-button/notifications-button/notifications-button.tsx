import React, {useCallback, useMemo} from 'react';
import {StyleSheet, StyleProp, ViewStyle, TextStyle} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import {useNotifications} from '@app/shared/contexts';

import {IconButton} from '../../icon-button';
import {NotificationsNavigationProps} from '@app/framework/native/containers/private/notifications/notifications.type';

export interface NotificationsButtonProps {
  containerStyle?: StyleProp<ViewStyle>;
  iconStyle?: StyleProp<TextStyle>;
}

export const NotificationsButton: React.FC<NotificationsButtonProps> = ({
  containerStyle,
  iconStyle,
}) => {
  const {totalUnread} = useNotifications();
  const notificationsNavigation = useNavigation<NotificationsNavigationProps>();

  const iconBaseStyle = useMemo(() => {
    return [styles.icon, iconStyle];
  }, [iconStyle]);

  const goToNotifications = useCallback(() => {
    notificationsNavigation.navigate('Notifications');
  }, [notificationsNavigation]);

  return (
    <IconButton
      name="bell"
      badge={totalUnread}
      style={iconBaseStyle}
      containerStyle={containerStyle}
      onPress={goToNotifications}
    />
  );
};

const styles = StyleSheet.create({
  icon: {},
});
