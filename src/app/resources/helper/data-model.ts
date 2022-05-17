import {ProductData, ProductModel} from '@data/models';

export const convertProductModelToProductData: (
  data: ProductModel,
) => ProductData = product => {
  return {
    ...product,
    id: product.productId,
    image: product?.files?.[0],
  };
};

export const convertProductModelListToProductDataList: (
  productList: ProductModel[],
) => ProductData[] = productList => {
  return productList.map(product => convertProductModelToProductData(product));
};
