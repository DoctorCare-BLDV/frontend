// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, {useCallback, useEffect, useMemo, useState} from 'react';

import axios from 'axios';

import {CartContext} from './cart.context';
import {
  CartLocalService,
  OrderService,
} from '@app/framework/native/infrastructure';
import {CartLocal, CartLocalProduct, ProductData} from '@data/models';
import {
  AddOrderApiRequest,
  AddOrderAPIResponse,
  ApiRequest,
} from '@data/models';
import {HTTPS_ERROR_MESSAGE, HTTPS_SUCCESS_STATUS} from '@app/resources';
import {showFlashMessage} from '@app/utils';
import {GetListHookOptions} from '@app/framework/native/hooks';

import {useUser} from '../user';

export interface AddOrderHookOptions extends GetListHookOptions {
  data: AddOrderApiRequest;
}

export const CartContextProvider: React.FC = ({children}) => {
  const {user} = useUser();
  const [productList, setProductList] = useState<CartLocalProduct[]>([]);
  const [addOrderRequest] = useState(new ApiRequest<AddOrderAPIResponse>());

  const totalProduct = useMemo(() => {
    return productList.length;
  }, [productList.length]);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const initCartLocal = useCallback(async () => {
    if (!user?.userInfoId) {
      return;
    }
    try {
      let cartLocal: CartLocal = JSON.parse(
        (await CartLocalService.getCart()) || '',
      );

      if (user?.userInfoId === cartLocal?.userId) {
        setProductList(cartLocal?.productList || []);
      }
    } catch (error) {
      console.log('error_init_local_cart', error);
    }
  }, [user]);

  // useEffect(() => {
  //   initCartLocal();
  // }, [initCartLocal]);

  const setCartProduct = useCallback(
    (product: ProductData, quantity?: number) => {
      let tempProductList = [...productList];

      const productIndex = tempProductList.findIndex(
        tempProduct => tempProduct.id === product.id,
      );

      if (productIndex === -1) {
        tempProductList.push({
          quantity: quantity || 1,
          ...product,
        });
      } else {
        tempProductList[productIndex] = {
          ...tempProductList[productIndex],
          ...product,
        };

        if (quantity !== undefined) {
          const updatedQuantity =
            (tempProductList[productIndex].quantity || 0) + quantity;
          tempProductList[productIndex].quantity =
            updatedQuantity < 0 ? 0 : updatedQuantity;
        }
      }

      tempProductList = tempProductList.filter(p => !!p.quantity);

      setProductList(tempProductList);
      // CartLocalService.saveCart({
      //   userId: user?.userInfoId || 0,
      //   productList: tempProductList,
      // });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [productList, user],
  );

  const removeProductFromCart = useCallback(
    (productId: number) => {
      const tempProductList = [...productList];

      tempProductList.splice(
        tempProductList.findIndex(product => product.id === productId),
      );

      setProductList(tempProductList);

      // CartLocalService.saveCart({
      //   userId: user?.userInfoId || 0,
      //   productList: tempProductList,
      // });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [productList, user],
  );

  const getCartProduct = useCallback(
    productId => {
      return productList.find(product => product.id === productId);
    },
    [productList],
  );

  const removeAllProductFromInventory = useCallback(
    inventoryId => {
      const removedProductList = productList.filter(
        product => product.inventory?.itemId !== inventoryId,
      );

      setProductList(removedProductList);
    },
    [productList],
  );

  const clearCart = useCallback(() => {
    setProductList([]);
    // CartLocalService.clearCart();
  }, []);

  const addOrder = useCallback(
    async (options: AddOrderHookOptions) => {
      try {
        options?.onBeforeRequest && options.onBeforeRequest();

        addOrderRequest.updateData(OrderService.addOrder(options.data));
        const response = await addOrderRequest.request();
        console.log(response);

        options?.onRequestSuccess && options.onRequestSuccess(response);

        showFlashMessage({
          type:
            response?.status === HTTPS_SUCCESS_STATUS ? 'success' : 'danger',
          message:
            response?.status === HTTPS_SUCCESS_STATUS
              ? response?.data?.message
              : response?.data?.message || HTTPS_ERROR_MESSAGE,
        });
      } catch (error: any) {
        console.log('err_get_item_list', error, error);

        options?.onRequestError && options.onRequestError(error);

        if (!axios.isCancel(error)) {
          showFlashMessage({
            type: 'danger',
            message: error?.response?.data?.message || HTTPS_ERROR_MESSAGE,
          });
        }
      } finally {
        options?.onEndRequest && options.onEndRequest();
      }
    },
    [addOrderRequest],
  );

  const cartTotalPrice = useMemo(() => {
    return (productList || []).reduce((prev, current) => {
      return prev + ((current.quantity || 0) * (current.sellPrice || 0) || 0);
    }, 0);
  }, [productList]);

  return (
    <CartContext.Provider
      value={{
        cartTotalPrice,
        productList,
        totalProduct,
        clearCart,
        addOrder,
        getCartProduct,
        setCartProduct,
        removeProductFromCart,
        removeAllProductFromInventory,
      }}>
      {children}
    </CartContext.Provider>
  );
};
