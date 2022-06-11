import React from 'react';
import {View, StyleSheet} from 'react-native';

import {getBottomSpace} from 'react-native-iphone-x-helper';

import {Colors} from '@app/resources';
import {TextView} from '@app/framework/native/components';
import {IOrder} from '@data/models';
import {convertNumberToPrice} from '@app/utils';

export interface OrderTotalProps {
  orderDetail: IOrder;
}

export const OrderTotal: React.FC<OrderTotalProps> = ({orderDetail}) => {
  return (
    <View style={[styles.container]}>
      <TextView style={styles.text}>{'Tổng thanh toán'}</TextView>
      <TextView style={styles.text}>
        {convertNumberToPrice(orderDetail.totalPrice)}
      </TextView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 16,
    backgroundColor: Colors.LIGHT_GRAY_4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: getBottomSpace() || 16,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.PRIMARY_ORANGE,
  },
});
