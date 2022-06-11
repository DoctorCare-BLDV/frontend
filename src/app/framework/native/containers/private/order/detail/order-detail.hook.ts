import {OrderService} from '@app/framework/native/infrastructure';
import {IOrder} from '@data/models';
import {useCallback, useEffect, useState} from 'react';
import {} from 'react-native';
import {showMessage} from 'react-native-flash-message';
import {OrderDetailProps} from './order-detail.type';

export function useOrderDetailModel(props: OrderDetailProps) {
  const {id} = props.route.params;
  const [orderDetail, setOrder] = useState<IOrder>();

  const getOrderDetail = useCallback(async () => {
    const {errorMessage, order} = await OrderService.fetchOrderDetail(id);
    if (!order) {
      // props.navigation.goBack();
      showMessage({
        message: errorMessage,
        type: 'danger',
      });
      return;
    }
    setOrder(order);
  }, [id]);

  /* eslint-disable */
  useEffect(() => {
    getOrderDetail();
  }, []);
  /* eslint-enable */

  return {
    getOrderDetail,
    orderDetail,
  };
}
