import React, {useCallback} from 'react';
import {RefreshControl, View} from 'react-native';
// import alias
import {ProductList as ProductListComponent} from '@native/components';
// localImport
import {ProductListProps} from './product-list.type';
import {Header} from './components';
import {styles} from './product-list.style';
import {useProductListModel} from './product-list.hook';
import {useNavigation} from '@react-navigation/native';

const _ProductList: React.FC<ProductListProps> = () => {
  const {
    selectedFilters,
    productList,
    totalProduct,
    isLoading,
    isLoadMore,
    isRefreshing,
    handleFilterChange,
    handleLoadMore,
    handleRefresh,
  } = useProductListModel();

  const productSearchNavigation = useNavigation<any>();

  const goToProductSearch = useCallback(() => {
    productSearchNavigation.navigate('ProductSearch', {
      selectedFilters,
    });
  }, [productSearchNavigation, selectedFilters]);

  return (
    <View style={[styles.container]}>
      <Header
        wrapperStyle={styles.headerWrapper}
        onPressSearchBar={goToProductSearch}
      />
      <ProductListComponent
        selectedFilters={selectedFilters}
        onFilterChange={handleFilterChange}
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
