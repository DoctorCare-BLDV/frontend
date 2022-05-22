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
};

export type TotalRevenueRequest = {
  fromDate?: string;
  toDate?: string;
};
export type GetAllRevenueLevel2Response = AxiosResponse<{
  content: {
    content: [
      {
        fullName: string;
        totalFailureOrder: number;
        totalPoint: number;
        totalPrice: number;
        totalProduct: number;
        userId: number;
      },
    ];
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
export type GetAllRevenueLevel2Request = {
  filterValues?: {
    additionalProp1?: string;
    additionalProp2?: string;
    additionalProp3?: string;
  };
  fromDate?: string;
  pageIndex?: number;
  pageSize?: number;
  sortValues?: {
    additionalProp1?: string;
    additionalProp2?: string;
    additionalProp3?: string;
  };
  toDate?: string;
};
