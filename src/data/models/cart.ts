import {ProductData} from './product';

export type CartLocalProduct = {
  quantity?: number;
} & ProductData;

export type CartLocal = {
  userId: number;
  productList?: CartLocalProduct[];
};

export type CartSection = {
  heading?: {title?: string; id?: number};
  data: ProductData[];
}[];
