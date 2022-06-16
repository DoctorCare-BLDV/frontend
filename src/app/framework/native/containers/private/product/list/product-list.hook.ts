import {useCallback, useEffect, useMemo, useRef, useState} from 'react';

import {useDebouncedCallback} from 'use-debounce';

import {notificationConfiguration} from '@app/framework/native/infrastructure';
import {RowItemData} from '@app/framework/native/components';
import {useProductList} from '@app/framework/native/hooks';
import {convertItemModelListToRowItemDataList} from '@app/resources';
import {ItemCategoryCode, ProductFilterValues} from '@data/models';
import {useNavigation} from '@react-navigation/native';

export function useProductListModel(initValue?: {
  selectedFilters: RowItemData[];
  searchValue: string;
}) {
  const {productList, getProductList, totalProduct, inventory} = useProductList(
    [],
  );
  const navigation = useNavigation();
  const isFirstTimeSetInventory = useRef(true);

  const [selectedFilters, setSelectedFilters] = useState<RowItemData[]>(
    initValue?.selectedFilters || [],
  );
  const [searchValue, setSearchValue] = useState(initValue?.searchValue || '');
  const [textSearch, setTextSearch] = useState(searchValue);

  const [isLoading, setLoading] = useState(false);
  const [isLoadMore, setLoadMore] = useState(false);
  const [isRefreshing, setRefreshing] = useState(false);

  /* eslint-disable */
  useEffect(() => {
    notificationConfiguration(navigation);
  }, []);
  /* eslint-enable */

  const filterValues: ProductFilterValues = useMemo(() => {
    return {
      productName: searchValue,
      productType: selectedFilters.reduce((prev, current) => {
        if (current.categoryCode === ItemCategoryCode.PRODUCT_TYPE) {
          return (prev ? prev + ';' : '') + current.id;
        }
        return prev;
      }, ''),
      inventoryId: selectedFilters.reduce((prev, current) => {
        if (current.categoryCode === ItemCategoryCode.INVENTORY) {
          return (prev ? prev + ';' : '') + current.id;
        }
        return prev;
      }, ''),
    };
  }, [selectedFilters, searchValue]);

  useEffect(() => {
    if (inventory && isFirstTimeSetInventory.current) {
      isFirstTimeSetInventory.current = false;
      setSelectedFilters(
        convertItemModelListToRowItemDataList(inventory).map(item => ({
          ...item,
          categoryCode: ItemCategoryCode.INVENTORY,
        })),
      );
    }
  }, [inventory]);

  const handleChangeSearchValue = useDebouncedCallback(value => {
    setSearchValue(value);
  }, 500);

  const handleChangeTextSearch = useCallback(
    value => {
      setTextSearch(value);
      handleChangeSearchValue(value);
    },
    [handleChangeSearchValue],
  );

  const handleFilterChange = useCallback((filters: RowItemData[]) => {
    setSelectedFilters(filters);
  }, []);

  const handleEndRequest = useCallback(() => {
    setLoadMore(false);
    setRefreshing(false);
    setLoading(false);
  }, []);

  useEffect(() => {
    setLoading(true);
    getProductList({
      data: {
        filterValues,
      },
      isRefreshing: true,
      onEndRequest: handleEndRequest,
    });
  }, [getProductList, handleEndRequest, filterValues]);

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

  return {
    selectedFilters,
    productList,
    searchValue,
    textSearch,
    getProductList,
    totalProduct,
    inventory,
    isLoading,
    isLoadMore,
    isRefreshing,
    handleChangeTextSearch,
    handleFilterChange,
    handleLoadMore,
    handleRefresh,
  };
}
