import React, {useCallback, useMemo, useState} from 'react';
import {
  StyleSheet,
  FlatList,
  View,
  FlatListProps,
  ActivityIndicator,
} from 'react-native';

import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

import {
  AppDimensions,
  Colors,
  convertItemModelToRowItemData,
  Layout,
} from '@app/resources';

import {useNavigation} from '@react-navigation/native';
import {FilterModalNavigationProps} from '@app/framework/native/containers/private/filter-modal/types';
import {ItemModel, ItemType, ItemCategoryCode, ProductData} from '@data/models';

import {ListHeader} from './list-header';
import {ProductItem} from './product-item';
import {RowItemData, RowItemType} from '../../row-item';
import {TextView} from '../../label';
import {useTheme} from '@app/shared/hooks/useTheme';
import {useItemList} from '@app/framework/native/hooks';
import {FullScreenLoadingIndicator} from '../../indicator';

export interface ProductListProps
  extends Omit<FlatListProps<ProductData>, 'renderItem'> {
  totalProduct?: number;

  isLoading?: boolean;
  isLoadMore?: boolean;

  selectedFilters?: RowItemData[];

  onPressFilter?: () => void;
  onLoadMore?: () => void;
  onFilterChange?: (selectedFilters: RowItemData[]) => void;
}

const MESSAGES = {
  NO_POST: 'Chưa có sản phẩm!',
  ALL_PRODUCT: 'Toàn bộ sản phẩm',
  CATEGORY: 'Danh mục',
  INVENTORY: 'Kho',
};

export const ProductList: React.FC<ProductListProps> = ({
  data,
  totalProduct,
  isLoading = false,
  isLoadMore,
  selectedFilters,
  onPressFilter,
  onLoadMore = () => {},
  onFilterChange = () => {},
  contentContainerStyle,
  ...props
}) => {
  const filterModalNavigation = useNavigation<FilterModalNavigationProps>();
  const theme = useTheme();

  const [isFilterLoading, setLoadingFilters] = useState(false);

  const {getItemList} = useItemList();

  const emptyTitleStyle = useMemo(() => {
    return [
      styles.emptyTitle,
      {
        color: theme.textColorScheme.secondary,
      },
    ];
  }, [theme]);

  const listContentContainerStyle = useMemo(() => {
    return [styles.listContentContainer, contentContainerStyle];
  }, [contentContainerStyle]);

  const handlePressFilter = useCallback(async () => {
    if (onPressFilter) {
      onPressFilter();
      return;
    }
    setLoadingFilters(true);

    let productTypeList: RowItemData[] = [],
      inventoryList: RowItemData[] = [];

    const formatItems = (
      items: ItemModel[],
      categoryCode: ItemCategoryCode,
    ) => {
      return items.map(item => ({
        ...convertItemModelToRowItemData(item),
        type: RowItemType.CHECK_BOX,
        checked: false,
        categoryCode,
      }));
    };

    await Promise.all([
      new Promise(async resolve => {
        productTypeList =
          (await getItemList({
            data: {categoryCode: ItemType.PRODUCT_TYPE},
            dataFormatter: items =>
              formatItems(items, ItemCategoryCode.PRODUCT_TYPE),
          })) || [];
        resolve('');
      }),
      new Promise(async resolve => {
        inventoryList =
          (await getItemList({
            data: {categoryCode: ItemType.INVENTORY},
            dataFormatter: items =>
              formatItems(items, ItemCategoryCode.INVENTORY),
          })) || [];
        resolve('');
      }),
    ]);

    setLoadingFilters(false);

    filterModalNavigation.navigate('FilterModal', {
      selectedData: selectedFilters,
      data: [
        {
          title: MESSAGES.CATEGORY,
          data: productTypeList,
        },
        {
          title: MESSAGES.INVENTORY,
          data: inventoryList,
        },
      ],
      onFinishSelectOptions: onFilterChange,
    });
  }, [
    onPressFilter,
    selectedFilters,
    filterModalNavigation,
    getItemList,
    onFilterChange,
  ]);

  const listHeaderComponent = useMemo(() => {
    const title = MESSAGES.ALL_PRODUCT + ': ' + (totalProduct || 0);

    return (
      <ListHeader
        title={title}
        isLoading={isFilterLoading}
        onPressFilter={handlePressFilter}
      />
    );
  }, [handlePressFilter, totalProduct, isFilterLoading]);

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
        <ProductItem product={product} imageStyle={styles.productImage} />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {listHeaderComponent}
      <FlatList
        contentContainerStyle={listContentContainerStyle}
        data={data || []}
        renderItem={renderProduct}
        numColumns={2}
        keyExtractor={(item, index) => String(item?.id || index)}
        keyboardShouldPersistTaps="handled"
        ListEmptyComponent={renderListEmpty}
        ListFooterComponent={renderLoadMore}
        scrollEventThrottle={16}
        onEndReachedThreshold={0.4}
        onEndReached={handleLoadMore}
        {...props}
      />
      <FullScreenLoadingIndicator useModal={false} visible={isLoading} />
    </View>
  );
};

const IMAGE_DIMENSIONS =
  AppDimensions.width / 2 -
  Layout.spacingHorizontal -
  Layout.spacingHorizontal / 2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
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
