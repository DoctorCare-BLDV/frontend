import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {RefreshControl, View} from 'react-native';
// import alias
import {ProductList as ProductListComponent} from '@native/components';
import {useProductList} from '@app/framework/native/hooks';
// localImport
import {ProductListProps} from './product-list.type';
import {Header} from './components';

import {styles} from './product-list.style';
import {ProductFilterValues} from '@data/models';

const _ProductList: React.FC<ProductListProps> = () => {
  const {productList, getProductList, totalProduct} = useProductList([]);

  const [isLoading, setLoading] = useState(true);
  const [isLoadMore, setLoadMore] = useState(false);
  const [isRefreshing, setRefreshing] = useState(false);
  console.log(productList);
  const filterValues: ProductFilterValues = useMemo(() => {
    return {
      productType: '',
      inventoryId: 19,
    };
  }, []);

  useEffect(() => {
    getProductList();
  }, [getProductList]);

  const handleEndRequest = useCallback(() => {
    setLoadMore(false);
    setLoading(false);
    setRefreshing(false);
  }, []);

  const handleLoadMore = useCallback(() => {
    getProductList({
      data: {
        filterValues,
      },
      isLoadMore: true,
      onBeforeRequest: () => setLoadMore(true),
      onEndRequest: handleEndRequest,
    });
  }, [filterValues, handleEndRequest, getProductList]);

  const handleRefresh = useCallback(() => {
    setRefreshing(true);

    getProductList({
      data: {
        filterValues,
      },
      isRefreshing: true,
      onEndRequest: handleEndRequest,
    });
  }, [getProductList, handleEndRequest, filterValues]);

  return (
    <View style={[styles.container]}>
      <Header wrapperStyle={styles.headerWrapper} />
      <ProductListComponent
        totalProduct={totalProduct}
        data={productList}
        isLoadMore={isLoadMore}
        isLoading={isLoading}
        onLoadMore={handleLoadMore}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />
        }
      />
    </View>
  );
};

export const ProductList = React.memo(_ProductList);
