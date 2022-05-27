import {
  LocalDistrict,
  LocalProvince,
  LocalWardList,
  Province,
} from '@data/models';
import AsyncStorage from '@react-native-community/async-storage';

const ADDRESS_LOCAL_KEY = {
  PROVINCE_LIST: 'provinceList',
  DISTRICT_LIST: 'districtList',
  WARD_LIST: 'wardList',
};

export class _AddressLocalService {
  async saveAddressList(addressList: Province[]) {
    let districtList: LocalDistrict[] = [];
    let wardList: LocalWardList[] = [];
    const provinceList = addressList.map(province => {
      const p = {...province};
      districtList.push({
        provinceCode: province.code,
        provinceName: province.name,
        districts:
          p.districts?.map(district => {
            const d = {...district};

            wardList.push({
              districtCode: district.code,
              districtName: district.name,
              wards:
                d.wards?.map(ward => {
                  return {...ward};
                }) || [],
            });
            return {
              ...district,
            };
          }) || [],
      });
      delete p.districts;
      return p;
    });

    return await Promise.all([
      AsyncStorage.setItem(
        ADDRESS_LOCAL_KEY.PROVINCE_LIST,
        JSON.stringify(provinceList),
      ).catch(err => console.log('err_save_local_province', err)),
      AsyncStorage.setItem(
        ADDRESS_LOCAL_KEY.DISTRICT_LIST,
        JSON.stringify(districtList),
      ).catch(err => console.log('err_save_local_district', err)),
      AsyncStorage.setItem(
        ADDRESS_LOCAL_KEY.WARD_LIST,
        JSON.stringify(wardList),
      ).catch(err => console.log('err_save_local_ward', err)),
    ]);
  }

  clearAddressList() {
    AsyncStorage.removeItem(ADDRESS_LOCAL_KEY.PROVINCE_LIST);
    AsyncStorage.removeItem(ADDRESS_LOCAL_KEY.DISTRICT_LIST);
    AsyncStorage.removeItem(ADDRESS_LOCAL_KEY.WARD_LIST);
  }

  async getAddressList() {
    const [provinceList, districtList, wardList] = await Promise.all([
      AsyncStorage.getItem(ADDRESS_LOCAL_KEY.PROVINCE_LIST),
      AsyncStorage.getItem(ADDRESS_LOCAL_KEY.DISTRICT_LIST),
      AsyncStorage.getItem(ADDRESS_LOCAL_KEY.WARD_LIST),
    ]);

    return {
      provinceList: JSON.parse(provinceList || '[]') as LocalProvince[],
      districtList: JSON.parse(districtList || '[]') as LocalDistrict[],
      wardList: JSON.parse(wardList || '[]') as LocalWardList[],
    };
  }
}

export const AddressLocalService = new _AddressLocalService();
