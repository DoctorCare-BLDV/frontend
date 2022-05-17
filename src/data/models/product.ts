import {AxiosResponse} from 'axios';
import {FileAttachmentModel} from './file';
import {InventoryModel} from './inventory';

export type ProductFilterValues = {
  productName?: string;
  productType?: string;
  inventoryId: number; // bắt buộc
};

export type ProductType = {
  productItemId: number;
  productId: number;
  itemId: number;
  itemLabel: string;
};

export type ProductModel = {
  productId: number;
  productName?: string;
  originalPrice?: number;
  sellPrice?: number;
  point?: number;
  description?: string;
  inventory?: InventoryModel;
  productType?: ProductType[];
  files?: FileAttachmentModel[];
};

export type ProductData = Omit<ProductModel, 'productId'> & {
  id: number;
  name?: string;
  image?: FileAttachmentModel;
};

export type GetProductListAPIRequest = {
  filterValues?: ProductFilterValues;
  pageIndex?: number;
  pageSize?: number;
};

export type GetProductListAPIResponse = AxiosResponse<{
  content: {
    pageIndex: number;
    pageSize: number;
    totalPages: number;
    totalRows: number;
    hasNext: boolean;
    hasPrevious: boolean;
    content: ProductModel[];
  };
  message: string;
  status: number;
}>;
