import React from 'react';
import {FlatList, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Divider} from 'react-native-elements';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {TextView} from '@app/framework/native/components';
import {Colors, vndCurrencyFormat} from '@app/resources';
import {SecondaryRevenueProps} from '../../revenue.type';

export const SecondaryRevenue = React.memo((props: SecondaryRevenueProps) => {
  const renderItem = React.useCallback(
    ({item, index}: any) => {
      return (
        <>
          <View style={[styles.row, styles.spaceBetween, styles.infoSecondary]}>
            <TextView style={[styles.textSecondary, styles.flex40]}>
              {item.name}
            </TextView>
            <TextView style={[styles.textSecondary, styles.flex30]}>
              {item.revenue}
            </TextView>
            <TextView style={styles.flex30}>{item.mv}</TextView>
          </View>
          {props.data.length - 1 !== index && <Divider />}
        </>
      );
    },
    [props.data],
  );

  return (
    <>
      <View style={styles.body}>
        <View
          style={[
            styles.row,
            styles.spaceBetween,
            styles.alignStart,
            styles.padding,
          ]}>
          <View style={[styles.row, styles.alignStart]}>
            <FontAwesome5
              name={'info-circle'}
              color={Colors.PRIMARY_ORAGE}
              size={20}
            />
            <View style={styles.infoMV}>
              <TextView style={styles.textTotal}>Tổng MV: 4400</TextView>
              <TextView style={styles.textTotal}>
                Tổng lợi nhuận: {vndCurrencyFormat(4400)}
              </TextView>
            </View>
          </View>
          {/* <TouchableOpacity onPress={() => props.openCalendar()}>
            <FontAwesome
              name="calendar"
              color={Colors.PRIMARY_ORAGE}
              size={24}
            />
          </TouchableOpacity> */}
        </View>
        <View style={[styles.row, styles.table, styles.spaceBetween]}>
          <TextView style={[styles.textTable, styles.flex40]}>
            Tên cấp hai
          </TextView>
          <TextView style={[styles.textTable, styles.flex30]}>
            Doanh thu
          </TextView>
          <TouchableOpacity
            onPress={() => props.sortData()}
            style={[styles.row, styles.flex30, styles.justifyEnd]}>
            <TextView style={[styles.textTable]}>MV</TextView>
            <FontAwesome
              style={styles.iconSort}
              name="sort"
              size={18}
              color={Colors.PRIMARY_ORAGE}
            />
          </TouchableOpacity>
        </View>
        <FlatList
          keyExtractor={item => item.id}
          data={props.data}
          renderItem={renderItem}
        />
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
  alignStart: {
    alignItems: 'flex-start',
  },
  infoMV: {
    marginLeft: 8,
  },
  textTotal: {
    fontWeight: '700',
    fontSize: 16,
    marginBottom: 8,
    color: Colors.PRIMARY_ORAGE,
  },
  table: {
    backgroundColor: Colors.LIGHT_GRAY_4,
    padding: 15,
  },
  textTable: {
    fontSize: 15,
    fontWeight: '500',
  },
  iconSort: {
    marginLeft: 4,
  },
  infoSecondary: {
    padding: 15,
  },
  textSecondary: {
    fontSize: 14,
    fontWeight: '400',
  },
  flex40: {
    flex: 0.4,
  },
  flex30: {
    flex: 0.3,
    textAlign: 'right',
  },
  justifyEnd: {
    justifyContent: 'flex-end',
  },
});
