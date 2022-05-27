import {useCallback, useEffect, useState} from 'react';

import {GetListHookOptions} from '@app/framework/native/hooks';
import {
  AddressLocalService,
  AddressService,
} from '@app/framework/native/infrastructure';
import {
  ApiRequest,
  GetAddressListAPIResponse,
  GetAddressListAPIRequest,
  AddressType,
  IAddress,
} from '@data/models';
import {showFlashMessage} from '@app/utils';
import {HTTPS_ERROR_MESSAGE, HTTPS_SUCCESS_STATUS} from '@app/resources';

export type GetAddressListOptions = GetAddressListAPIRequest & {
  provinceName?: string;
  districtName?: string;
};

export interface GetAddressListHookOptions extends GetListHookOptions {
  data: GetAddressListOptions;
}

export function useAddress() {
  const [getAddressListRequest] = useState(
    new ApiRequest<GetAddressListAPIResponse>(),
  );

  const getLocalAddressList = useCallback(
    async ({type, provinceName, districtName}: GetAddressListOptions) => {
      const {provinceList, districtList, wardList} =
        await AddressLocalService.getAddressList();
      switch (type) {
        case AddressType.PROVINCE:
          return provinceList || [];
        case AddressType.DISTRICT:
          return (
            (districtList || []).find(
              district => district.provinceName === provinceName,
            )?.districts || []
          );
        case AddressType.WARD:
          return (
            (wardList || []).find(ward => ward.districtName === districtName)
              ?.wards || []
          );
        default:
          return [];
      }
    },
    [],
  );

  const getAddressList: (
    options: GetAddressListHookOptions,
    ignoreLocalData?: boolean,
  ) => Promise<IAddress[]> = useCallback(
    async (options: GetAddressListHookOptions, ignoreLocalData = false) => {
      let addressList: IAddress[] = [];

      if (!ignoreLocalData) {
        addressList = (await getLocalAddressList(options.data)) as IAddress[];

        if (addressList?.length) {
          return addressList;
        } else {
          return await getAddressList(options, true);
        }
      }

      getAddressListRequest.updateData(AddressService.getAddress(options.data));
      if (options.onBeforeRequest) {
        options.onBeforeRequest();
      }

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
    [getAddressListRequest, getLocalAddressList],
  );

  useEffect(() => {
    getAddressList(
      {
        data: {type: AddressType.WARD},
        onRequestSuccess: res => {
          AddressLocalService.saveAddressList(res.data);
        },
      },
      false,
    );
  }, [getAddressList]);

  return {
    getAddressList,
  };
}
