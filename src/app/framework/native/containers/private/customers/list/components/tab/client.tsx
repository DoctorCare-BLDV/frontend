import React, {useCallback} from 'react';
import {FlatList, RefreshControl, StyleSheet, View} from 'react-native';
// import from library
import {Divider} from 'react-native-elements';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faInbox} from '@fortawesome/free-solid-svg-icons';
import {Icon} from '@fortawesome/fontawesome-svg-core';
// import from alias
import {TextView} from '@native/components';
import {AppDimensions, Colors, Layout} from '@app/resources';
import {GetAllCustomersResponse} from '@data/models';
// localImport

interface Props {
  data: GetAllCustomersResponse[];
  loading: boolean;
  refreshData: () => void;
  loadMore: () => void;
}
export const Client = React.memo((props: Props) => {
  const {data, loadMore, loading, refreshData} = props;
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

  const renderItem = useCallback(({item}) => {
    return (
      <View>
        <View style={styles.item}>
          <View style={styles.container}>
            <TextView style={styles.userName}>{item.orderReceived}</TextView>
            <TextView style={styles.code}>{item.orderPhone}</TextView>
          </View>
          <TextView style={styles.address}>{item.orderAddress}</TextView>
        </View>
        <Divider />
      </View>
    );
  }, []);

  return (
    <>
      <FlatList
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={refreshData} />
        }
        ListEmptyComponent={renderEmpty()}
        onEndReached={loadMore}
        style={styles.container}
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.orderId.toString()}
        // onEndReachedThreshold={1}
      />
    </>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  imgAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  userName: {
    fontSize: 15,
    fontWeight: '500',
    lineHeight: 18,
    marginBottom: 4,
  },
  code: {
    fontSize: 15,
    color: Colors.GRAY,
    fontWeight: '400',
    lineHeight: 18,
  },
  address: {
    fontSize: 15,
    fontWeight: '400',
    lineHeight: 18,
    textAlign: 'right',
    flex: 1,
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
