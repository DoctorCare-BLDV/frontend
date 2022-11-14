import React, {useCallback, useEffect, useMemo, useRef} from 'react';
import {
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
  Linking,
} from 'react-native';

import {useNavigation} from '@react-navigation/native';

import {IconButton} from '../../icon-button';
import {NotificationsNavigationProps} from '@app/framework/native/containers/private/notifications/notifications.type';
import {UserService} from '@app/framework/native/infrastructure';

export interface NotificationsButtonProps {
  containerStyle?: StyleProp<ViewStyle>;
  iconStyle?: StyleProp<TextStyle>;
}

export const NotificationsButton: React.FC<NotificationsButtonProps> = ({
  containerStyle,
  iconStyle,
}) => {
  // const {totalUnread} = useNotifications();
  const notificationsNavigation = useNavigation<NotificationsNavigationProps>();
  const hotline = useRef('');

  const iconBaseStyle = useMemo(() => {
    return [styles.icon, iconStyle];
  }, [iconStyle]);

  useEffect(() => {
    const loadHotline = async () => {
      hotline.current = await UserService.getHotline();
    };
    loadHotline();
  }, []);

  const goToNotifications = useCallback(() => {
    // notificationsNavigation.navigate('Notifications');
    if (!hotline.current) return;
    const phone = hotline.current;
    Linking.canOpenURL('tel:' + phone).then(supported => {
      if (supported) Linking.openURL('tel:' + phone);
    });
  }, [notificationsNavigation]);

  return (
    <IconButton
      name="phone"
      badge={0}
      style={iconBaseStyle}
      containerStyle={containerStyle}
      onPress={goToNotifications}
    />
  );
};

const styles = StyleSheet.create({
  icon: {},
});
