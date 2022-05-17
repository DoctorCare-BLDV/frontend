import React, {useCallback, useMemo} from 'react';
import {StyleSheet, FlatList, View, FlatListProps} from 'react-native';

import {AppDimensions, Layout} from '@app/resources';

import {useNavigation} from '@react-navigation/native';
import {FilterModalNavigationProps} from '@app/framework/native/containers/private/filter-modal/types';

import {ListHeader} from './list-header';
import {ProductItem, ProductData} from './product-item';
import {RowItemType} from '../../row-item';

export interface ProductListProps
  extends Omit<FlatListProps<ProductData>, 'renderItem'> {
  onPressFilter?: () => void;
}

export const ProductList: React.FC<ProductListProps> = ({
  data,
  onPressFilter,
  ...props
}) => {
  const filterModalNavigation = useNavigation<FilterModalNavigationProps>();

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
    return <ListHeader onPressFilter={handlePressFilter} />;
  }, [handlePressFilter]);

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
          name={product.name}
          price={product.price}
          coinPrice={product.coinPrice}
          image={product.image}
          imageStyle={styles.productImage}
        />
      </View>
    );
  };

  return (
    <FlatList
      contentContainerStyle={styles.listContentContainer}
      data={data || []}
      renderItem={renderProduct}
      numColumns={2}
      keyExtractor={(item, index) => String(item?.id || index)}
      ListHeaderComponent={listHeaderComponent}
      keyboardShouldPersistTaps="handled"
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
});
