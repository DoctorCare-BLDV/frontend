import React from 'react';
import {StyleSheet, View} from 'react-native';
import {TextView} from '@app/framework/native/components';
import {Colors, vndCurrencyFormat} from '@app/resources';
const CategoriesRevenue = [
  {key: 'Doanh thu đơn', value: 'selfRevenue'},
  {key: 'Tổng MV của cấp 2', value: 'totalMV'},
  {key: 'Doanh thu cấp 2', value: 'level2Revenue'},
  {key: 'Tổng doanh thu', value: 'totalRevenue'},
];

export interface TotalRevenueProps {
  data?: any;
}

export const TotalRevenue = React.memo((props: TotalRevenueProps) => {
  return (
    <>
      <View style={[styles.body, styles.padding]}>
        {CategoriesRevenue.map(v => {
          return (
            <View key={v.key} style={[styles.row, styles.infoCategories]}>
              <TextView style={styles.textCategories}>{v.key}: </TextView>
              <TextView
                style={styles.valueCategories}
                color={Colors.PRIMARY_ORANGE}>
                {CategoriesRevenue[1].key === v.key
                  ? `${props.data?.[v.value]} MV`
                  : vndCurrencyFormat(props.data?.[v.value] ?? 0)}
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
    // paddingVertical: 16,
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
    color: Colors.PRIMARY_ORANGE,
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
