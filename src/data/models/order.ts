import {AxiosResponse} from 'axios';

export interface IOrder {
  createAt: number;
  createBy: number;
  file: {url: string};
  listOrderProduct?: IOrderProduct[];
  orderAddress: string;
  orderDescription: string;
  orderDistrict: string;
  orderId: number;
  orderPhone: string;
  orderProvince: string;
  orderReceived: string;
  orderWard: string;
  status:
    | ORDER_STATUS.CANCEL
    | ORDER_STATUS.COMPLETED
    | ORDER_STATUS.CONFIRMING
    | ORDER_STATUS.DELIVERING
    | ORDER_STATUS.FAILURE
    | ORDER_STATUS.TAKING;
  totalBenefit: number;
  totalPoint: number;
  totalPrice: number;
  totalProduct: number;
  key: number;
}

export interface IOrderProduct {
  benefit: number;
  count: number;
  listFileAttach: {url: string}[];
  orderProductId: number;
  productId: number;
  totalPoint: number;
  totalPrice: number;
  unitPoint: number;
}

export enum ORDER_STATUS {
  CANCEL = 0,
  CONFIRMING = 1,
  TAKING = 2,
  DELIVERING = 3,
  COMPLETED = 4,
  FAILURE = 5,
}

export type AddOrderApiRequest = {
  inventoryList: [
    {
      inventoryId: number;
      orderProductList: [
        {
          count: number;
          inventoryId: number;
          profitPrice: number;
          point: number;
          productId: number;
          sellPrice: number;
        },
      ];
    },
  ];
  orderAddress: string;
  orderDescription: string;
  orderDistrict: string;
  orderPhone: string;
  orderProvince: string;
  orderReceived: string;
  orderWard: string;
  orderUserName: string;
};

export type AddOrderAPIResponse = AxiosResponse<{
  content: any;
  message: string;
  status: number;
}>;
