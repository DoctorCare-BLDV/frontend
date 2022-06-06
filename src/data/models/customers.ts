import {AxiosResponse} from 'axios';
import {Avatar} from './user';

export type CustomerFilter = {
  customer?: string;
};

export type ICustomer = {
  address: string;
  avatar?: Avatar | undefined;
  bankAccount: string;
  bankName: string;
  block: boolean;
  email: string;
  fullName: string;
  introCode: string;
  myIntroCode: string;
  password: string;
  phone: string;
  roleId: {
    roleCode: string;
    roleId: number;
    roleName: string;
  };
  userInfoId: number;
  totalBenefit: number;
  totalPrice: number;
};
export type GetAllCustomer = AxiosResponse<{
  content: {
    pageIndex: number;
    pageSize: number;
    totalPages: number;
    totalRows: number;
    hasNext: boolean;
    hasPrevious: boolean;
    content: ICustomer[];
  };
  message: string;
  status: number;
}>;

export type GetCustomerRequest = {
  filterValues?: CustomerFilter;
  pageIndex?: number;
  pageSize?: number;
};
export type GetAllCustomersResponse = {
  doctor: string;
  orderAddress: string;
  orderId: number;
  orderPhone: string;
  orderReceived: string;
  shippingCode: string;
};
