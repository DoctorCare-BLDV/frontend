import React from 'react';
import {View, StyleSheet, Image} from 'react-native';

import {Colors} from '@app/resources';
import {Tag, TextView} from '@app/framework/native/components';
import {IOrder} from '@data/models';
import {convertNumberToPrice} from '@app/utils';

export interface OrderProductProps {
  orderDetail: IOrder;
}

export const OrderProduct: React.FC<OrderProductProps> = ({orderDetail}) => {
  if (!orderDetail.listOrderProduct?.length) return null;
  return (
    <>
      <View style={styles.spacing} />
      <View style={[styles.container]}>
        {orderDetail.listOrderProduct?.map((i, index) => (
          <View style={styles.item} key={index.toString()}>
            <Image
              style={styles.image}
              resizeMode="contain"
              source={{
                uri: i.listFileAttach.length > 0 ? i.listFileAttach[0].url : '',
              }}
            />
            <View style={styles.content}>
              <TextView style={styles.name} numberOfLines={2}>
                {i.productName}
              </TextView>
              <TextView style={styles.quantity}>x{i.count}</TextView>
              <View style={styles.priceWrapper}>
                <View style={styles.priceContainer}>
                  <TextView style={styles.totalPrice}>
                    {convertNumberToPrice(i.unitPrice)}
                  </TextView>
                  <Tag
                    label={String(i.unitPoint) + ' MV'}
                    containerStyle={styles.coinPriceContainer}
                  />
                  <TextView style={[styles.totalPrice, styles.boldText]}>
                    {convertNumberToPrice(i.totalPrice)}
                  </TextView>
                </View>
              </View>
            </View>
          </View>
        ))}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.WHITE,
    flex: 1,
  },
  spacing: {
    height: 8,
    backgroundColor: Colors.LIGHT_GRAY_4,
    width: '100%',
  },

  item: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: Colors.LIGHT_GRAY_4,
  },
  image: {
    width: 65,
    height: 100,
    marginRight: 18,
  },
  content: {
    flex: 1,
  },
  name: {
    fontSize: 14,
    fontWeight: '400',
  },
  quantity: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.GRAY,
    textAlign: 'right',
    marginTop: 4,
  },
  priceWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  totalPrice: {
    fontSize: 14,
    color: Colors.PRIMARY_ORANGE,
  },

  coinPriceContainer: {
    marginLeft: 4,
  },
  boldText: {
    flex: 1,
    fontWeight: '500',
    textAlign: 'right',
  },
});
