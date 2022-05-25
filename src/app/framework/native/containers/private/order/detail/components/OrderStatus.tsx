import React, {useMemo} from 'react';
import {View, StyleSheet} from 'react-native';

import {TextView} from '@app/framework/native/components';
import {Colors, OrderStatusFilter} from '@app/resources';
import {ORDER_STATUS} from '@data/models';

export interface OrderStatusProps {
  statusId: number;
}

export const OrderStatus: React.FC<OrderStatusProps> = ({statusId}) => {
  const {message, bgStyle, textStyle} = useMemo(() => {
    let defaultStyle = {
      message: '',
      bgStyle: {},
      textStyle: {},
    };
    const status = OrderStatusFilter.find(i => i.id === statusId);
    if (!status) return defaultStyle;
    if (status.id === ORDER_STATUS.COMPLETED) {
      return {
        message: status.message,
        bgStyle: styles.successBg,
        textStyle: styles.whiteText,
      };
    }
    if (status.id === ORDER_STATUS.FAILURE) {
      return {
        message: status.message,
        bgStyle: styles.failBg,
        textStyle: {},
      };
    }
    return {
      message: status.message,
      bgStyle: {},
      textStyle: {},
    };
  }, [statusId]);

  if (!message) return null;
  return (
    <View style={[styles.container, bgStyle]}>
      <TextView style={[styles.text, textStyle]}>{message}</TextView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: Colors.WARNING_50,
  },
  text: {
    color: Colors.GRAY,
    fonWeight: '500',
    fontSize: 14,
  },
  whiteText: {
    color: Colors.WHITE,
  },
  successBg: {
    backgroundColor: Colors.SUCCESS_70,
  },
  failBg: {
    backgroundColor: Colors.GRAY_50,
  },
});
