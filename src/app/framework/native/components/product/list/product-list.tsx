import React, {useCallback, useMemo} from 'react';
import {
  StyleSheet,
  FlatList,
  View,
  FlatListProps,
  ActivityIndicator,
} from 'react-native';

import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

import {AppDimensions, Colors, Layout} from '@app/resources';

import {useNavigation} from '@react-navigation/native';
import {FilterModalNavigationProps} from '@app/framework/native/containers/private/filter-modal/types';
import {ProductData} from '@data/models';

import {ListHeader} from './list-header';
import {ProductItem} from './product-item';
import {RowItemType} from '../../row-item';
import {TextView} from '../../label';
import {useTheme} from '@app/shared/hooks/useTheme';

export interface ProductListProps
  extends Omit<FlatListProps<ProductData>, 'renderItem'> {
  totalProduct?: number;
  onPressFilter?: () => void;
  onLoadMore?: () => void;
  isLoading?: boolean;
  isLoadMore?: boolean;
}

const MESSAGES = {
  NO_POST: 'Chưa có sản phẩm!',
  ALL_PRODUCT: 'Toàn bộ sản phẩm',
};

export const ProductList: React.FC<ProductListProps> = ({
  data,
  totalProduct,
  isLoading,
  isLoadMore,
  onPressFilter,
  onLoadMore = () => {},
  ...props
}) => {
  const filterModalNavigation = useNavigation<FilterModalNavigationProps>();
  const theme = useTheme();

  const emptyTitleStyle = useMemo(() => {
    return [
      styles.emptyTitle,
      {
        color: theme.textColorScheme.secondary,
      },
    ];
  }, [theme]);

  const listContentContainerStyle = useMemo(() => {
    return [styles.listContentContainer, props.contentContainerStyle];
  }, [props.contentContainerStyle]);

  const handlePressFilter = useCallback(() => {
    if (onPressFilter) {
      onPressFilter();
      return;
    }

    filterModalNavigation.navigate('FilterModal', {
      selectedData: [
        {id: 3, label: 'Thuốc bổ gan', type: RowItemType.CHECK_BOX},
        {id: 6, label: 'Kho Hà Đông', type: RowItemType.CHECK_BOX},
      ],
      data: [
        {
          title: 'Danh mục',
          data: [
            {id: 1, label: 'Thuốc bổ não', type: RowItemType.CHECK_BOX},
            {id: 2, label: 'Thuốc bổ tim', type: RowItemType.CHECK_BOX},
            {id: 3, label: 'Thuốc bổ gan', type: RowItemType.CHECK_BOX},
          ],
        },
        {
          title: 'Kho',
          data: [
            {id: 4, label: 'Kho Thanh Xuân', type: RowItemType.CHECK_BOX},
            {id: 5, label: 'Kho Long Biên', type: RowItemType.CHECK_BOX},
            {id: 6, label: 'Kho Hà Đông', type: RowItemType.CHECK_BOX},
          ],
        },
      ],
      onFinishSelectOptions: e => console.log(e),
    });
  }, [onPressFilter, filterModalNavigation]);

  const listHeaderComponent = useMemo(() => {
    const title = totalProduct
      ? MESSAGES.ALL_PRODUCT + ': ' + totalProduct
      : '';
    return <ListHeader title={title} onPressFilter={handlePressFilter} />;
  }, [handlePressFilter, totalProduct]);

  const handleLoadMore = useCallback(() => {
    onLoadMore();
  }, [onLoadMore]);

  const renderListEmpty = useCallback(() => {
    if (isLoading) {
      return null;
    }

    return (
      <View style={styles.emptyWrapper}>
        <FontAwesome5Icon name="capsules" style={styles.emptyIcon} />
        <TextView style={emptyTitleStyle}>{MESSAGES.NO_POST}</TextView>
      </View>
    );
  }, [isLoading, emptyTitleStyle]);

  const renderLoadMore = useCallback(() => {
    if (!isLoadMore) {
      return null;
    }

    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="small" />
      </View>
    );
  }, [isLoadMore]);

  const renderProduct = ({
    item: product,
    index,
  }: {
    item: ProductData;
    index: number;
  }) => {
    return (
      <View
        style={[
          styles.productContainer,
          {
            [index % 2 === 0 ? 'paddingRight' : 'paddingLeft']:
              Layout.spacingHorizontal / 2,
          },
        ]}>
        <ProductItem
          name={product.productName}
          originalPrice={product.originalPrice}
          point={product.point}
          image={product.files?.[0]}
          imageStyle={styles.productImage}
        />
      </View>
    );
  };

  return (
    <FlatList
      contentContainerStyle={listContentContainerStyle}
      data={data || []}
      renderItem={renderProduct}
      numColumns={2}
      keyExtractor={(item, index) => String(item?.id || index)}
      keyboardShouldPersistTaps="handled"
      ListHeaderComponent={listHeaderComponent}
      ListEmptyComponent={renderListEmpty}
      ListFooterComponent={renderLoadMore}
      scrollEventThrottle={16}
      onEndReachedThreshold={0.4}
      onEndReached={handleLoadMore}
      {...props}
    />
  );
};

const IMAGE_DIMENSIONS =
  AppDimensions.width / 2 -
  Layout.spacingHorizontal -
  Layout.spacingHorizontal / 2;

const styles = StyleSheet.create({
  container: {},
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  listContentContainer: {
    paddingBottom: Layout.spacingHorizontal,
    flexGrow: 1,
  },
  productContainer: {
    width: AppDimensions.width / 2,
    padding: Layout.spacingHorizontal,
    paddingBottom: 0,
  },
  productImage: {
    width: IMAGE_DIMENSIONS,
    height: IMAGE_DIMENSIONS,
  },

  emptyWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyIcon: {
    fontSize: 70,
    color: Colors.DIM_BLACK,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: Layout.spacingVertical,
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 30,
  },
});
