import React from 'react';
import {View, ScrollView} from 'react-native';
// import from library
// import from alias
import {Header, Skeleton} from '@native/components';
// localImport
import {useOrderDetailModel} from './order-detail.hook';
import {OrderDetailProps} from './order-detail.type';
import {styles} from './order-detail.style';
import {OrderInfo, OrderProduct, OrderStatus, OrderTotal} from './components';

const _OrderDetail: React.FC<OrderDetailProps> = props => {
  const {} = props;
  const {orderDetail} = useOrderDetailModel(props);

  if (!orderDetail) return null;

  return (
    <View style={styles.container}>
      <Header
        leftOnpress={props.navigation.goBack}
        title={'Chi tiết đơn hàng'}
      />
      {!orderDetail ? (
        <Skeleton />
      ) : (
        <>
          <OrderStatus statusId={orderDetail.status} />
          <ScrollView style={styles.content}>
            <OrderInfo orderDetail={orderDetail} />
            <OrderProduct orderDetail={orderDetail} />
          </ScrollView>
          <OrderTotal orderDetail={orderDetail} />
        </>
      )}
    </View>
  );
};

export const OrderDetail = React.memo(_OrderDetail);
