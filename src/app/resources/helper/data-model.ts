import {RowItemData} from '@app/framework/native/components';
import {ItemModel, ProductData, ProductModel} from '@data/models';

export const convertProductModelToProductData: (
  data: ProductModel,
) => ProductData = product => {
  return {
    ...product,
    name: product.productName,
    id: product.productId,
    image: product?.files?.[0],
  };
};

export const convertProductModelListToProductDataList: (
  productList: ProductModel[],
) => ProductData[] = productList => {
  return productList.map(product => convertProductModelToProductData(product));
};

export const convertItemModelToRowItemData: (
  data: ItemModel,
) => RowItemData = item => {
  return {
    ...item,
    id: item.itemId,
    label: item.itemName,
  };
};

export const convertItemModelListToRowItemDataList: (
  itemList: ItemModel[],
) => RowItemData[] = itemList => {
  return itemList.map(item => convertItemModelToRowItemData(item));
};
