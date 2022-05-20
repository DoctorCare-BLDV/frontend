import React, {useCallback, useEffect, useRef, useState} from 'react';

import {showFlashMessage} from '@app/utils';
import {
  convertProductModelListToProductDataList,
  HTTPS_ERROR_MESSAGE,
  HTTPS_SUCCESS_STATUS,
} from '@app/resources';
import {ProductService} from '../infrastructure';
import {
  GetProductListAPIRequest,
  ApiRequest,
  ProductData,
  GetProductListAPIResponse,
  InventoryModel,
} from '@data/models';

export type GetListHookOptions = {
  isLoadMore?: boolean;
  isRefreshing?: boolean;
  onBeforeRequest?: () => any;
  onEndRequest?: () => any;
  onRequestSuccess?: (response: any) => any;
  onRequestError?: (error: any) => any;
};

export interface GetProductListHookOptions extends GetListHookOptions {
  data?: GetProductListAPIRequest;
}

const MIN_PAGE_INDEX = 0;
const PAGE_SIZE = 3;

export function useProductList(initProductList = []): {
  productList: ProductData[];
  inventory?: InventoryModel[];
  getProductList: (
    options?: GetProductListHookOptions,
  ) => Promise<InventoryModel[] | undefined>;
  totalProduct: number;
  setProductList: React.Dispatch<React.SetStateAction<ProductData[]>>;
} {
  const [getProductListRequest] = useState(
    new ApiRequest<GetProductListAPIResponse>(),
  );
  const [inventory, setInventory] = useState<InventoryModel[] | undefined>();
  const [totalProduct, setTotalProduct] = useState(0);

  const canLoadMore = useRef(true);
  const isRequesting = useRef(false);
  const pageIndex = useRef(MIN_PAGE_INDEX);
  const pageSize = useRef(PAGE_SIZE);
  const currentOptions = useRef<GetProductListHookOptions>({});

  const [productList, setProductList] =
    useState<ProductData[]>(initProductList);

  const formatOptions = useCallback(
    (customOptions: GetProductListHookOptions = {}) => {
      return {
        isLoadMore: false,
        isRefreshing: false,
        onBeforeRequest: () => {},
        onEndRequest: () => {},
        onRequestSuccess: () => {},
        onRequestError: () => {},
        ...customOptions,

        data: {
          pageIndex: pageIndex.current,
          // pageSize: pageSize.current,
          ...(customOptions.data || {}),
        },
      };
    },
    [],
  );

  const executeSuccessRequest = useCallback(
    (productListData, options: GetProductListHookOptions = {}) => {
      let products = convertProductModelListToProductDataList(
        productListData || [],
      );

      setProductList(previousProducts => {
        if (options.isLoadMore) {
          return previousProducts.concat(products);
        } else {
          return options.isRefreshing || !!products?.length
            ? products
            : previousProducts;
        }
      });
    },
    [],
  );

  const getProductList = useCallback(
    async (customOptions: GetProductListHookOptions = {}) => {
      currentOptions.current = customOptions;
      if (customOptions.isRefreshing) {
        getProductListRequest.cancel();
        pageIndex.current = MIN_PAGE_INDEX;
        isRequesting.current = false;
        customOptions.isLoadMore = false;
      }

      const options = formatOptions(customOptions);

      if (isRequesting.current) {
        options.onEndRequest();
        return;
      }

      if (options.isLoadMore) {
        if (canLoadMore.current) {
          pageIndex.current++;
          options.data.pageIndex = pageIndex.current;
        } else {
          options.onEndRequest();
          return;
        }
      }

      isRequesting.current = true;
      let isLoadMoreFail = false;
      console.log(options, customOptions);
      try {
        options.onBeforeRequest();
        getProductListRequest.updateData(
          ProductService.getProductList(options.data),
        );
        const response = await getProductListRequest.request();
        console.log(response);
        options.onRequestSuccess(response);

        isLoadMoreFail = response?.status !== HTTPS_SUCCESS_STATUS;
        canLoadMore.current = !!response?.data?.content?.hasNext;

        if (response && response.status === HTTPS_SUCCESS_STATUS) {
          if (response?.data?.content?.inventory) {
            setInventory(response?.data?.content?.inventory);
          }
          setTotalProduct(response?.data?.content?.totalRows || 0);
          executeSuccessRequest(
            response?.data?.content?.content || [],
            options,
          );

          return response?.data?.content?.inventory;
        } else {
          showFlashMessage({
            type: 'danger',
            message: response?.data?.message || HTTPS_ERROR_MESSAGE,
          });
        }
      } catch (error: any) {
        isLoadMoreFail = true;

        options.onRequestError(error);

        console.log('err_get_list_post', error);
        showFlashMessage({
          type: 'danger',
          message: error?.message || HTTPS_ERROR_MESSAGE,
        });
      } finally {
        isRequesting.current = false;

        if (isLoadMoreFail) {
          pageIndex.current =
            pageIndex.current <= MIN_PAGE_INDEX
              ? MIN_PAGE_INDEX
              : pageIndex.current - 1;
        }

        options.onEndRequest();
      }
    },
    [getProductListRequest, formatOptions, executeSuccessRequest],
  );

  useEffect(() => {
    return () => {
      getProductListRequest.cancel();
      isRequesting.current = false;
      pageIndex.current = MIN_PAGE_INDEX;
      pageSize.current = PAGE_SIZE;
    };
  }, [getProductListRequest]);

  return {productList, inventory, getProductList, totalProduct, setProductList};
}
