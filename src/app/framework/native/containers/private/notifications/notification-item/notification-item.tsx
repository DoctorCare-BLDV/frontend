import React, {useMemo} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';

import {Image, TextView} from '@app/framework/native/components';
import {Layout} from '@app/resources';
import {hexToRgba} from '@app/utils';
import {useTheme} from '@app/shared/hooks';

export interface NotificationItemProps {
  id?: number;
  title?: string;
  image?: string;
  isUnread?: boolean;
}

export const NotificationItem: React.FC<NotificationItemProps> = ({
  image,
  title,
  isUnread,
}) => {
  const theme = useTheme();
  const containerBaseStyle = useMemo(() => {
    return [
      styles.container,
      {
        borderColor: theme.colorScheme.border,
      },
      !!isUnread && {
        backgroundColor: hexToRgba(theme.colorScheme.primary, 0.1),
      },
    ];
  }, [isUnread, theme]);

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => {}}
      style={containerBaseStyle}>
      {!!image && <Image source={{uri: image}} style={styles.image} />}
      <TextView style={styles.title}>{title}</TextView>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: Layout.spacingHorizontal,
    paddingVertical: Layout.spacingVertical,
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
});
