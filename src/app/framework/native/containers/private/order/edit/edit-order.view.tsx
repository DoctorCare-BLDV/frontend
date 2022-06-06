import React from 'react';
import {View, TouchableOpacity} from 'react-native';
// import from library
// import from alias
import {
  FullScreenLoadingIndicator,
  Header,
  ProductSectionList,
  Skeleton,
  TextView,
} from '@native/components';
import {FileAttachmentModel} from '@data/models';
import {convertNumberToPrice} from '@app/utils';
// localImport
import {useEditOrderModel} from './edit-order.hook';
import {EditOrderProps} from './edit-order.type';
import {styles} from './edit-order.style';
import {CustomerInfo} from './components';

const _EditOrder: React.FC<EditOrderProps> = props => {
  const {
    orderDetail,
    loading,
    saving,
    updateProductQuantity,
    productList,
    updateCustomerInfo,
    totalPrice,
    onSave,
  } = useEditOrderModel(props);
  if (loading) return <Skeleton />;

  return (
    <View style={[styles.container]}>
      <Header
        leftOnpress={props.navigation.goBack}
        title={'Chỉnh sửa đơn hàng'}
      />
      <FullScreenLoadingIndicator visible={saving} />
      <ProductSectionList
        ListHeaderComponent={
          <CustomerInfo
            address={orderDetail.current?.orderAddress}
            district={orderDetail.current?.orderDistrict}
            name={orderDetail.current?.orderReceived}
            phone={orderDetail.current?.orderPhone}
            province={orderDetail.current?.orderProvince}
            ward={orderDetail.current?.orderWard}
            onFormDataChange={updateCustomerInfo}
          />
        }
        style={{
          flex: 1,
        }}
        sections={[
          {
            heading: null,
            data:
              productList.map(i => ({
                name: i.productName,
                id: i.productId,
                sellPrice: i.unitPrice,
                quantity: i.count,
                point: i.unitPoint,
                image:
                  i.listFileAttach?.length > 0
                    ? (i.listFileAttach[0] as FileAttachmentModel)
                    : undefined,
              })) || [],
          },
        ]}
        onProductChangeQuantity={updateProductQuantity}
        contentContainerStyle={styles.listContentContainer}
      />
      <View style={styles.row}>
        <TextView style={styles.priceTitle}>{'Tổng thanh toán'}</TextView>
        <TextView style={styles.priceValue}>
          {convertNumberToPrice(totalPrice)}
        </TextView>
        <TouchableOpacity onPress={onSave} style={styles.btnWrapper}>
          <TextView style={styles.btnText}>{'Lưu'}</TextView>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export const EditOrder = React.memo(_EditOrder);
