import React from 'react';
import {View, StyleSheet} from 'react-native';

import {Image, TextView} from '@app/framework/native/components';
import {Layout} from '@app/resources';

export interface NotificationItemProps {
  id?: number;
  title?: string;
  image?: string;
}

export const NotificationItem: React.FC<NotificationItemProps> = ({
  image,
  title,
}) => {
  return (
    <View style={styles.container}>
      {!!image && <Image source={{uri: image}} style={styles.image} />}
      <TextView style={styles.title}>{title}</TextView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: Layout.spacingHorizontal,
    paddingVertical: Layout.spacingVertical,
  },
  image: {
    width: 70,
    height: 70,
  },
  title: {
    flex: 1,
  },
});
