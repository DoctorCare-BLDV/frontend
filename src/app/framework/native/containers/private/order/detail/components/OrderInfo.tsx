import React from 'react';
import {View, StyleSheet} from 'react-native';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faCircleInfo} from '@fortawesome/free-solid-svg-icons';
import {Icon} from '@fortawesome/fontawesome-svg-core';

import {Colors} from '@app/resources';
import {TextView} from '@app/framework/native/components';
import {IOrder} from '@data/models';

export interface OrderInfoProps {
  orderDetail: IOrder;
}

export const OrderInfo: React.FC<OrderInfoProps> = ({orderDetail}) => {
  return (
    <View style={[styles.container]}>
      <FontAwesomeIcon
        icon={faCircleInfo as Icon}
        size={20}
        color={Colors.PRIMARY_ORANGE}
      />
      <View style={styles.content}>
        <TextView style={styles.title}>{'Thông tin khách hàng'}</TextView>
        <TextView style={styles.value}>{orderDetail.orderReceived}</TextView>
        <TextView style={styles.value}>{orderDetail.orderPhone}</TextView>
        <TextView style={styles.value}>{orderDetail.orderAddress}</TextView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: Colors.WHITE,
    flexDirection: 'row',
  },
  content: {
    marginLeft: 8,
  },
  title: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.PRIMARY_ORANGE,
  },
  value: {
    fontSize: 14,
    marginTop: 4,
  },
});
