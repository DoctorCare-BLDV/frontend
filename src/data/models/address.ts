export interface IAddress {
  name: string;
  code: number;
  codename: string;
  division_type: string;
  phone_code: number;
}

export type Ward = IAddress;

export type District = IAddress & {
  wards?: Ward[];
};

export type Province = IAddress & {
  districts?: District[];
};

export enum AddressType {
  PROVINCE = 1,
  DISTRICT = 2,
  WARD = 3,
}

export type GetAddressListAPIRequest = {
  type: AddressType;
};

export type GetAddressListAPIResponse = {
  data: Province[];
  status: number;
};
