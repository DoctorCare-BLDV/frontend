// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, {useCallback, useEffect, useState} from 'react';

import {CartContext} from './cart.context';
import {CartLocalService} from '@app/framework/native/infrastructure';
import {CartLocal, CartLocalProduct, ProductData} from '@data/models';
import {useUser} from '../user';

export const CartContextProvider: React.FC = ({children}) => {
  const {user} = useUser();
  const [productList, setProductList] = useState<CartLocalProduct[]>([]);

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

  return (
    <CartContext.Provider
      value={{
        productList,
        clearCart,
        getCartProduct,
        setCartProduct,
        removeProductFromCart,
        removeAllProductFromInventory,
      }}>
      {children}
    </CartContext.Provider>
  );
};
