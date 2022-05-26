import {useCallback, useState} from 'react';

import {GetListHookOptions} from '@app/framework/native/hooks';
import {AddressService} from '@app/framework/native/infrastructure';
import {
  ApiRequest,
  GetAddressListAPIResponse,
  GetAddressListAPIRequest,
  AddressType,
  IAddress,
} from '@data/models';
import {showFlashMessage} from '@app/utils';
import {HTTPS_ERROR_MESSAGE, HTTPS_SUCCESS_STATUS} from '@app/resources';

export interface GetAddressListHookOptions extends GetListHookOptions {
  data: GetAddressListAPIRequest & {
    provinceName?: string;
    districtName?: string;
  };
}

export function useAddress() {
  const [getAddressListRequest] = useState(
    new ApiRequest<GetAddressListAPIResponse>(),
  );

  const getAddressList = useCallback(
    async (options: GetAddressListHookOptions) => {
      getAddressListRequest.updateData(AddressService.getAddress(options.data));
      if (options.onBeforeRequest) {
        options.onBeforeRequest();
      }
      let addressList: IAddress[] = [];

      try {
        const response = await getAddressListRequest.request();
        if (options.onRequestSuccess) {
          options.onRequestSuccess(response);
        }

        if (
          response?.status === HTTPS_SUCCESS_STATUS &&
          Array.isArray(response?.data)
        ) {
          switch (options.data.type) {
            case AddressType.PROVINCE:
              addressList = response.data;
              break;
            case AddressType.DISTRICT:
              addressList =
                response.data.find(
                  province => province.name === options.data.provinceName,
                )?.districts || [];
              break;
            case AddressType.WARD:
              addressList =
                response.data
                  .find(province => province.name === options.data.provinceName)
                  ?.districts?.find(
                    district => district.name === options.data.districtName,
                  )?.wards || [];
              break;
          }
        }
      } catch (error: any) {
        if (options.onRequestError) {
          options.onRequestError(error);
        }

        console.log('err_get_address_list', error);
        showFlashMessage({
          type: 'danger',
          message: error?.message || HTTPS_ERROR_MESSAGE,
        });
      } finally {
        if (options.onEndRequest) {
          options.onEndRequest();
        }
        return addressList;
      }
    },
    [getAddressListRequest],
  );

  return {
    getAddressList,
  };
}
