import React, {useCallback, useContext} from 'react';
import {RefreshControl, View} from 'react-native';
// import from library
import {SwipeListView, SwipeRow} from 'react-native-swipe-list-view';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faInbox} from '@fortawesome/free-solid-svg-icons';
import {Icon} from '@fortawesome/fontawesome-svg-core';
// import from alias
import {
  FullScreenLoadingIndicator,
  Order,
  Tabbar,
  TextView,
} from '@native/components';
import {ORDER_STATUS} from '@data/models';
// localImport
import {OrderListContext, OrderListProvider} from './order-list.context';
import {OrderListProps} from './order-list.type';
import {styles} from './order-list.style';
import {Header, RightActions} from './components';

const Tab = [
  {key: 'process', name: 'Chưa hoàn thành', total: 0},
  {key: 'done', name: 'Đã hoàn thành', total: 0},
];

const _OrderList: React.FC<OrderListProps> = props => {
  const {navigation} = props;
  const {
    index,
    setIndex,
    data,
    loading,
    cancelOrder,
    refreshData,
    loadMore,
    refreshing,
  } = useContext(OrderListContext);

  const renderEmpty = React.useCallback(() => {
    if (!!data.length) return undefined;
    return (
      <View style={styles.emptyWrapper}>
        <FontAwesomeIcon
          icon={faInbox as Icon}
          style={styles.emptyIcon}
          size={80}
        />
        <TextView style={styles.emptyText}>
          {'Không thấy đơn hàng nào'}
        </TextView>
      </View>
    );
  }, [data]);

  const navigateToDetail = useCallback(
    (id: number) => {
      navigation.navigate('OrderDetail', {
        id,
      });
    },
    [navigation],
  );

  const navigateToEditOrder = useCallback(
    (id: number) => {
      navigation.navigate('EditOrder', {
        id,
      });
    },
    [navigation],
  );

  return (
    <View style={styles.container}>
      <FullScreenLoadingIndicator visible={loading} />
      <Tabbar list={Tab} currentIdx={index} onChangeTab={setIndex} />
      <Header />
      <SwipeListView
        indicatorStyle="black"
        style={styles.list}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={refreshData} />
        }
        ListEmptyComponent={renderEmpty()}
        keyExtractor={item => item.orderId.toString()}
        data={data}
        onEndReached={loadMore}
        renderItem={(rowData, rowMap) => (
          <SwipeRow
            disableRightSwipe={true}
            disableLeftSwipe={rowData.item.status !== ORDER_STATUS.CONFIRMING}
            rightOpenValue={-70}>
            <RightActions
              onAction={() => cancelOrder(rowData.item.orderId)}
              data={rowData}
              rowMap={rowMap}
            />
            <Order
              onEdit={() => navigateToEditOrder(rowData.item.orderId)}
              onPress={() => navigateToDetail(rowData.item.orderId)}
              item={rowData.item}
            />
          </SwipeRow>
        )}
      />
    </View>
  );
};

export const OrderList = React.memo((props: OrderListProps) => {
  return (
    <OrderListProvider {...props}>
      <_OrderList {...props} />
    </OrderListProvider>
  );
});
