import React, {useMemo} from 'react';
// import from library
import {RefreshControl, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
// import from alias
import {ProductList} from '@native/components';
// localImport
import {useProductSearchModel} from './product-search.hook';
import {ProductSearchProps} from './product-search.type';
import {styles} from './product-search.style';
import {ProductSearchHeader} from './components';
import {useProductListModel} from '../list/product-list.hook';

const _ProductSearch: React.FC<ProductSearchProps> = ({route}) => {
  const {} = useProductSearchModel();
  const {bottom} = useSafeAreaInsets();

  const {
    textSearch,
    selectedFilters,
    productList,
    totalProduct,
    isLoading,
    isLoadMore,
    isRefreshing,
    handleChangeTextSearch,
    handleFilterChange,
    handleLoadMore,
    handleRefresh,
  } = useProductListModel({
    selectedFilters: route.params?.selectedFilters || [],
    searchValue: route.params?.searchValue || '',
  });

  const listStyle = useMemo(() => {
    return {
      paddingBottom: bottom,
    };
  }, [bottom]);

  return (
    <View style={styles.container}>
      <ProductSearchHeader
        value={textSearch}
        onChangeText={handleChangeTextSearch}
      />
      <ProductList
        contentContainerStyle={listStyle}
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

export const ProductSearch = React.memo(_ProductSearch);
