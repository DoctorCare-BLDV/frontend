import React, {useMemo} from 'react';
import {View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import moment from 'moment';
import {Colors, OrderStatusFilter} from '@app/resources';
import {IOrder, ORDER_STATUS} from '@data/models';
import {convertNumberToPrice} from '@app/utils';
import {TextView} from '../label';
import {IconButton} from '../icon-button';

export interface OrderProps {
  item: IOrder;
  onPress?: () => void;
}

export const Order: React.FC<OrderProps> = props => {
  const {item, onPress} = props;

  const {status, editable} = useMemo(() => {
    const orderStatus = OrderStatusFilter.filter(i => i.id === item.status);
    if (!orderStatus.length) {
      return {
        status: OrderStatusFilter[1].label,
        editable: true,
      };
    }
    return {
      status: orderStatus[0].label,
      editable: orderStatus[0].id === ORDER_STATUS.CONFIRMING,
    };
  }, [item.status]);

  const statusColor = useMemo(() => {
    const orderStatus = OrderStatusFilter.find(i => i.id === item.status);
    if (
      !orderStatus ||
      orderStatus.id === ORDER_STATUS.CONFIRMING ||
      orderStatus.id === ORDER_STATUS.DELIVERING ||
      orderStatus.id === ORDER_STATUS.TAKING
    ) {
      return Colors.YELLOW;
    }
    if (orderStatus.id === ORDER_STATUS.COMPLETED) {
      return Colors.GREEN;
    }
    return Colors.YELLOW;
  }, [item.status]);

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => onPress?.()}
      style={StyleSheet.flatten([styles.container])}>
      <View style={styles.imgWrapper}>
        <Image
          source={{
            uri: item.file?.url || '',
          }}
          resizeMethod="scale"
          resizeMode="contain"
          style={styles.img}
        />
        <TextView style={styles.count}>
          {item.totalProduct + ' sản phẩm'}
        </TextView>
      </View>
      <View style={styles.infoWrapper}>
        <TextView style={[styles.title, styles.name]} numberOfLines={1}>
          {'Khách hàng: '}
          <TextView style={styles.bold}>{item.orderReceived}</TextView>
        </TextView>
        <View style={styles.infoSpacing} />
        <TextView style={styles.title} numberOfLines={1}>
          {`Số điện thoại: ${item.orderPhone}`}
        </TextView>
        <View style={styles.infoSpacing} />
        <View style={styles.row}>
          <TextView style={styles.title} numberOfLines={1}>
            {`Ngày lên đơn: ${moment(item.createAt).format('DD/MM/YYYY')}`}
          </TextView>
        </View>
        <View style={styles.infoSpacing} />
        <TextView style={[styles.title, styles.flex1]} numberOfLines={1}>
          {'Tiền hàng: '}
          <TextView style={styles.bold} color={Colors.PRIMARY_ORAGE}>
            {convertNumberToPrice(item.totalPrice)}
          </TextView>
        </TextView>
        <View style={styles.infoSpacing} />
        <TextView style={styles.title} numberOfLines={1}>
          {'Lợi nhuận: '}
          <TextView style={styles.bold} color={Colors.PRIMARY_ORAGE}>
            {convertNumberToPrice(item.totalBenefit)}
          </TextView>
        </TextView>
        <TextView color={statusColor} style={styles.status}>
          {status}
        </TextView>
        {editable && (
          <IconButton name="edit" containerStyle={styles.editWrapper} />
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 22,
    paddingVertical: 12,
    flexDirection: 'row',
    backgroundColor: Colors.WHITE,
  },
  imgWrapper: {
    alignItems: 'center',
  },
  img: {
    height: 82,
    width: 60,
    borderWidth: 1,
    borderColor: Colors.LIGHT_GRAY,
  },
  count: {
    fontSize: 12,
    marginTop: 12,
    color: Colors.GRAY,
  },
  infoWrapper: {
    flex: 1,
    marginLeft: 16,
  },
  name: {
    marginRight: 30,
  },
  title: {
    fontSize: 13,
  },
  flex1: {
    flex: 1,
  },
  bold: {
    fontWeight: '500',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  infoSpacing: {
    marginTop: 12,
  },
  status: {
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  editWrapper: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
});
