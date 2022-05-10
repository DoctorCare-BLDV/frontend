import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {Colors} from '@app/resources';
import {TextView} from '../label';
import {IconButton} from '../icon-button';

export interface OrderProps {}

export const Order: React.FC<OrderProps> = props => {
  const {} = props;
  return (
    <View style={StyleSheet.flatten([styles.container])}>
      <View style={styles.imgWrapper}>
        <Image
          source={{
            uri: 'https://images.unsplash.com/photo-1517142089942-ba376ce32a2e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzR8fHByb2R1Y3R8ZW58MHx8MHx8&w=1000&q=80',
          }}
          resizeMethod="scale"
          resizeMode="contain"
          style={styles.img}
        />
        <TextView style={styles.count}>{'3 sản phẩm'}</TextView>
      </View>
      <View style={styles.infoWrapper}>
        <TextView style={[styles.title, styles.name]} numberOfLines={1}>
          {'Khách hàng: '}
          <TextView style={styles.bold}>
            {'Nguyễn Ngọc Anh laknsl knasl nalks nlk'}
          </TextView>
        </TextView>
        <View style={styles.infoSpacing} />
        <TextView style={styles.title} numberOfLines={1}>
          {`Số điện thoại: ${'01234567890'}`}
        </TextView>
        <View style={styles.infoSpacing} />
        <View style={styles.row}>
          <TextView style={styles.title} numberOfLines={1}>
            {`Ngày lên đơn: ${'01/01/2022'}`}
          </TextView>
        </View>
        <View style={styles.infoSpacing} />
        <TextView style={[styles.title, styles.flex1]} numberOfLines={1}>
          {'Tiền hàng: '}
          <TextView style={styles.bold} color={Colors.PRIMARY_ORAGE}>
            {'1.000.000đ'}
          </TextView>
        </TextView>
        <View style={styles.infoSpacing} />
        <TextView style={styles.title} numberOfLines={1}>
          {'Lợi nhuận: '}
          <TextView style={styles.bold} color={Colors.PRIMARY_ORAGE}>
            {'500.000đ'}
          </TextView>
        </TextView>
        <TextView style={styles.status}>{'Chờ xác nhận'}</TextView>
        <IconButton name="edit" containerStyle={styles.editWrapper} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 22,
    paddingVertical: 12,
    flexDirection: 'row',
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
    color: Colors.YELLOW,
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
