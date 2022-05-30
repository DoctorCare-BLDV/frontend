import React from 'react';
import {
  FlatList,
  RefreshControl,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {Divider} from 'react-native-elements';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {TextView} from '@app/framework/native/components';
import {faInbox} from '@fortawesome/free-solid-svg-icons';
import {Icon} from '@fortawesome/fontawesome-svg-core';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {AppDimensions, Colors, Layout, vndCurrencyFormat} from '@app/resources';
import {MemberLevel2, TotalRevenueType} from '@data/models';

export interface SecondaryRevenueProps {
  data: Array<MemberLevel2> | undefined;
  sortData: () => void;
  loadMore: () => void;
  refreshData: () => void;
  loading: boolean;
  totalRevenue: TotalRevenueType | undefined;
}

export const SecondaryRevenue = React.memo((props: SecondaryRevenueProps) => {
  const {data, sortData, loadMore, loading, refreshData, totalRevenue} = props;
  const renderItem = React.useCallback(
    (item, index) => {
      return (
        <>
          <View style={[styles.row, styles.spaceBetween, styles.infoSecondary]}>
            <TextView style={[styles.textSecondary, styles.flex40]}>
              {item.fullName}
            </TextView>
            <TextView style={[styles.textSecondary, styles.flex30]}>
              {item.totalPrice}
            </TextView>
            <TextView style={styles.flex30}>{item.totalProduct}</TextView>
          </View>
          {data && data?.length - 1 !== index && <Divider />}
        </>
      );
    },
    [data],
  );
  const renderEmpty = React.useCallback(() => {
    if (data && !!data.length) return undefined;
    return (
      <View style={styles.emptyWrapper}>
        <FontAwesomeIcon
          icon={faInbox as Icon}
          style={styles.emptyIcon}
          size={80}
        />
        <TextView style={styles.emptyText}>{'Không có dữ liệu'}</TextView>
      </View>
    );
  }, [data]);

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
              <TextView style={styles.textTotal}>
                Tổng MV: {totalRevenue?.totalMV}
              </TextView>
              <TextView style={styles.textTotal}>
                Tổng lợi nhuận: {vndCurrencyFormat(totalRevenue?.level2Revenue)}
              </TextView>
            </View>
          </View>
        </View>
        <View style={[styles.row, styles.table, styles.spaceBetween]}>
          <TextView style={[styles.textTable, styles.flex40]}>
            Tên cấp hai
          </TextView>
          <TextView style={[styles.textTable, styles.flex30]}>
            Doanh thu
          </TextView>
          <TouchableOpacity
            onPress={() => sortData()}
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
          refreshControl={
            <RefreshControl refreshing={loading} onRefresh={refreshData} />
          }
          ListEmptyComponent={renderEmpty()}
          onEndReached={loadMore}
          keyExtractor={(item, index) => index.toString()}
          data={data}
          renderItem={({item, index}) => renderItem(item, index)}
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
  emptyWrapper: {
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: AppDimensions.height * 0.2,
  },
  emptyText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.DIM_BLACK,
    marginTop: Layout.hitSlop.top,
  },
  emptyIcon: {
    color: Colors.DIM_BLACK,
  },
});
