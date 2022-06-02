import {AxiosResponse} from 'axios';

export type TotalRevenueResponse = AxiosResponse<{
  content: TotalRevenueType;
  message: string;
  status: number;
}>;
export type TotalRevenueType = {
  endTime: string;
  level2Revenue: number;
  selfRevenue: number;
  startTime: string;
  totalFailureOrder: number;
  totalMV: number;
  totalRevenue: number;
  paymentStatus: boolean;
};

export type TotalRevenueRequest = {
  fromDate?: string;
  toDate?: string;
};
export type GetAllRevenueLevel2Response = AxiosResponse<{
  content: {
    content: [MemberLevel2];
    hasNext: boolean;
    hasPrevious: boolean;
    pageIndex: number;
    pageSize: number;
    totalPages: number;
    totalRows: number;
  };
  message: string;
  status: number;
}>;
export type MemberLevel2 = {
  fullName: string;
  totalFailureOrder: number;
  totalPoint: number;
  totalPrice: number;
  totalProduct: number;
  userId: number;
};
export type GetAllRevenueLevel2Request = {
  fromDate?: string;
  pageIndex?: number;
  pageSize?: number;
  sortValues?: {
    MV?: string;
  };
  toDate?: string;
};
