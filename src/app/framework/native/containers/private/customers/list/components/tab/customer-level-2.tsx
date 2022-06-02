import React, {useCallback} from 'react';
import {
  FlatList,
  Image,
  RefreshControl,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
// import from library
import {Divider} from 'react-native-elements';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faInbox} from '@fortawesome/free-solid-svg-icons';
import {Icon} from '@fortawesome/fontawesome-svg-core';
// import from alias
import {TextView} from '@app/framework/native/components';
import {AppDimensions, Colors, Layout} from '@app/resources';
import {ICustomer} from '@data/models';
import {getUserAvatarForImage} from '@app/utils';
// localImport

interface Props {
  navigation: any;
  data: ICustomer[];
  loading: boolean;
  refreshData: () => void;
  loadMore: () => void;
}
export const CustomerLevel2 = React.memo((props: Props) => {
  const {navigation, data, loading, refreshData, loadMore} = props;

  const navigateToDetail = useCallback(
    id => {
      navigation.navigate('CustomersDetail', {
        id,
      });
    },
    [navigation],
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

  const renderItem = useCallback(
    ({item}) => {
      return (
        <View>
          <TouchableOpacity
            onPress={() => navigateToDetail(item.userInfoId)}
            style={styles.item}>
            <Image
              source={getUserAvatarForImage(item.avatar)}
              style={styles.imgAvatar}
            />
            <View>
              <TextView style={styles.userName}>{item.fullName}</TextView>
              <TextView style={styles.code}>{item.introCode}</TextView>
            </View>
          </TouchableOpacity>
          <Divider />
        </View>
      );
    },
    [navigateToDetail],
  );
  return (
    <>
      <FlatList
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={refreshData} />
        }
        ListEmptyComponent={renderEmpty()}
        onEndReached={loadMore}
        contentContainerStyle={styles.container}
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.userInfoId.toString()}
        onEndReachedThreshold={1}
      />
    </>
  );
});

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
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
