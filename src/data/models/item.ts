import {AxiosResponse} from 'axios';

export enum ItemType {
  PRODUCT_TYPE = 'PRODUCT_TYPE',
  INVENTORY = 'INVENTORY',
}

export enum ItemCategoryCode {
  PRODUCT_TYPE = 1,
  INVENTORY = 2,
}

export type GetAllItemAPIRequest = {
  categoryCode: ItemType;
};

export type GetAllItemAPIResponse = AxiosResponse<{
  content: ItemModel[];
  message: string;
  status: number;
}>;

export type ItemModel = {
  itemCode: string;
  itemId: number;
  itemName: string;
  categoryId: number;
  categoryCode?: ItemCategoryCode;
};
