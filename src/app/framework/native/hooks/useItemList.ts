import React, {useCallback, useEffect, useState} from 'react';

import {
  ApiRequest,
  GetAllItemAPIRequest,
  GetAllItemAPIResponse,
  ItemModel,
} from '@data/models';
import {
  convertItemModelListToRowItemDataList,
  HTTPS_ERROR_MESSAGE,
  HTTPS_SUCCESS_STATUS,
} from '@app/resources';
import {showFlashMessage} from '@app/utils';

import {GetListHookOptions} from './useProductList';
import {ItemService} from '../infrastructure';
import {RowItemData} from '../components';

export interface GetItemListHookOptions extends GetListHookOptions {
  data: GetAllItemAPIRequest;
  dataFormatter?: (items: ItemModel[]) => any;
}

export function useItemList<T extends RowItemData>(
  initItemList: T[] = [],
): {
  itemList: T[];
  getItemList: (options: GetItemListHookOptions) => Promise<T[] | undefined>;
  setItemList: React.Dispatch<React.SetStateAction<T[]>>;
} {
  const [getItemListRequest] = useState(
    new ApiRequest<GetAllItemAPIResponse>(),
  );

  const [itemList, setItemList] = useState<T[]>(initItemList);

  const getItemList = useCallback(
    async (options: GetItemListHookOptions) => {
      try {
        options?.onBeforeRequest && options.onBeforeRequest();

        getItemListRequest.updateData(
          ItemService.getAllItemByCategoryCode(options.data),
        );
        const response = await getItemListRequest.request();
        console.log(response);

        options?.onRequestSuccess && options.onRequestSuccess(response);

        if (response && response.status === HTTPS_SUCCESS_STATUS) {
          let items = options?.dataFormatter
            ? options.dataFormatter(response?.data?.content || [])
            : convertItemModelListToRowItemDataList(
                response?.data?.content || [],
              );

          setItemList(items);

          return items;
        } else {
          showFlashMessage({
            type: 'danger',
            message: response?.data?.message || HTTPS_ERROR_MESSAGE,
          });
        }
      } catch (error: any) {
        console.log('err_get_item_list', error);

        options?.onRequestError && options.onRequestError(error);

        showFlashMessage({
          type: 'danger',
          message: error?.message,
        });
      } finally {
        options?.onEndRequest && options.onEndRequest();
      }
    },
    [getItemListRequest],
  );

  useEffect(() => {
    return () => {
      getItemListRequest.cancel();
    };
  }, [getItemListRequest]);

  return {itemList, getItemList, setItemList};
}
