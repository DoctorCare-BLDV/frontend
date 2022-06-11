import {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {Alert} from 'react-native';
import {showMessage} from 'react-native-flash-message';
import {OrderService} from '@app/framework/native/infrastructure';
import {
  IOrder,
  IOrderProduct,
  ProductData,
  UpdateOrderApiRequest,
} from '@data/models';
import {EditOrderProps} from './edit-order.type';

export function useEditOrderModel(props: EditOrderProps) {
  const {id} = props.route.params;
  const [loading, setLoading] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);
  const orderDetail = useRef<IOrder | undefined>();
  const [productList, setProductList] = useState<IOrderProduct[]>([]);

  const fetchNewOrder = useCallback(async () => {
    const {errorMessage, order} = await OrderService.fetchNewOrderInfo(id);
    if (!order) {
      showMessage({
        message: errorMessage,
        type: 'danger',
      });
      return;
    }
    orderDetail.current = order;
    setProductList(order.listOrderProduct || []);
  }, [id]);

  const getOrderDetail = useCallback(async () => {
    const {errorMessage, order} = await OrderService.fetchOrderDetail(id);
    if (!order) {
      props.navigation.goBack();
      showMessage({
        message: errorMessage,
        type: 'danger',
      });
      return;
    }
    if (order.productChanged) {
      Alert.alert(
        '',
        'Sản phẩm trong đơn hàng đã có thông tin mới. Bạn có muốn cập nhật đơn hàng với thông tin mới nhất không?',
        [
          {text: 'Hủy', style: 'cancel', onPress: () => {}},
          {text: 'Đồng ý', onPress: fetchNewOrder},
        ],
      );
    }
    orderDetail.current = order;
    setProductList(order.listOrderProduct || []);
    setLoading(false);
  }, [id, props.navigation, fetchNewOrder]);

  const updateProductQuantity = useCallback(
    (quant: number, product: ProductData) => {
      if (!orderDetail.current) return;
      const prodList = productList.map(i => {
        if (i.productId === product.id)
          return {
            ...i,
            count: quant,
          };
        return i;
      });
      if (!prodList) return;
      setProductList([...prodList]);
    },
    [productList],
  );

  const totalPrice = useMemo(() => {
    let total = 0;
    productList.forEach(i => {
      total = total + i.unitPrice * i.count;
    });
    return total;
  }, [productList]);

  const updateCustomerInfo = useCallback(
    ({
      address,
      district,
      name,
      phone,
      province,
      ward,
    }: {
      name?: string | undefined;
      phone?: string | undefined;
      province?: string | undefined;
      district?: string | undefined;
      ward?: string | undefined;
      address?: string | undefined;
    }) => {
      if (!orderDetail.current) return;
      orderDetail.current = {
        ...orderDetail.current,
        orderReceived: name || '',
        orderPhone: phone || '',
        orderAddress: address || '',
        orderDistrict: district || '',
        orderProvince: province || '',
        orderWard: ward || '',
      };
    },
    [orderDetail],
  );

  const onSave = useCallback(async () => {
    if (
      !orderDetail.current ||
      !orderDetail.current.orderReceived ||
      !orderDetail.current.orderPhone ||
      !orderDetail.current.orderAddress ||
      !orderDetail.current.orderDistrict ||
      !orderDetail.current.orderProvince ||
      !orderDetail.current.orderWard
    ) {
      return showMessage({
        message: 'Vui lòng nhập đủ thông tin nhận hàng',
        type: 'warning',
      });
    }

    const data: UpdateOrderApiRequest = {
      orderId: orderDetail.current.orderId,
      orderReceived: orderDetail.current.orderReceived,
      orderPhone: orderDetail.current.orderPhone,
      orderProvince: orderDetail.current.orderProvince,
      orderDistrict: orderDetail.current.orderDistrict,
      orderWard: orderDetail.current.orderWard,
      orderAddress: orderDetail.current.orderAddress,
      orderProductList: productList.map(i => ({
        count: i.count,
        inventoryId: i.inventoryId,
        point: i.unitPoint,
        productId: i.productId,
        sellPrice: i.unitPrice,
      })),
    };
    setSaving(true);
    const {errorMessage, order} = await OrderService.updateOrder(data);
    setSaving(false);
    if (!order) {
      showMessage({
        message: errorMessage,
        type: 'danger',
      });
      return;
    }
    props.navigation.goBack();
    showMessage({
      message: 'Cập nhật đơn hàng thành công!',
      type: 'success',
    });
  }, [productList, props.navigation]);

  /* eslint-disable */
  useEffect(() => {
    getOrderDetail();
  }, []);
  /* eslint-enable */

  return {
    updateCustomerInfo,
    getOrderDetail,
    orderDetail,
    updateProductQuantity,
    loading,
    productList,
    saving,
    totalPrice,
    onSave,
  };
}
