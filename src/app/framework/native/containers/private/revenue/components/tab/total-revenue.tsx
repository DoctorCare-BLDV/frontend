import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import moment from 'moment';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {TextView} from '@app/framework/native/components';
import {Colors} from '@app/resources';
import {TotalRevenueProps} from '../../revenue.type';
const CategoriesRevenue = [
  {key: 'Doanh thu đơn', value: 'totalFailureOrder'},
  {key: 'Tổng MV của cấp 2', value: 'totalMV'},
  {key: 'Doanh thu cấp 2', value: 'level2Revenue'},
  {key: 'Tổng doanh thu', value: 'totalRevenue'},
];

export const TotalRevenue = React.memo((props: TotalRevenueProps) => {
  const date =
    moment(props.date).format('DD/MM/YYYY') === moment().format('DD/MM/YYYY')
      ? 'hôm nay'
      : moment(props.date).format('DD/MM/YYYY');
  return (
    <>
      <View style={[styles.body, styles.padding]}>
        <View style={[styles.row, styles.spaceBetween]}>
          <TextView style={styles.titleRevenue}>{`Doanh thu ${date}`}</TextView>
          <TouchableOpacity onPress={() => props.openCalendar()}>
            <FontAwesome
              name="calendar"
              color={Colors.PRIMARY_ORAGE}
              size={24}
            />
          </TouchableOpacity>
        </View>
        {CategoriesRevenue.map(v => {
          return (
            <View key={v.key} style={[styles.row, styles.infoCategories]}>
              <TextView style={styles.textCategories}>{v.key}: </TextView>
              <TextView
                style={styles.valueCategories}
                color={Colors.PRIMARY_ORAGE}>
                {props.data?.[v.value] ?? 0}
              </TextView>
            </View>
          );
        })}
      </View>
    </>
  );
});
const styles = StyleSheet.create({
  body: {
    flex: 1,
  },
  padding: {
    paddingVertical: 16,
    paddingHorizontal: 12,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  spaceBetween: {
    justifyContent: 'space-between',
  },
  titleRevenue: {
    fontSize: 16,
    color: Colors.PRIMARY_ORAGE,
    fontWeight: '700',
  },
  infoCategories: {
    marginTop: 20,
    marginHorizontal: 16,
  },
  textCategories: {
    fontSize: 14,
    fontWeight: '400',
  },
  valueCategories: {
    fontSize: 15,
    fontWeight: '500',
  },
});
