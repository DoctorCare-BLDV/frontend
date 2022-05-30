import React from 'react';
import {CartContext} from './cart.context';
export function useCart() {
  const {
    cartTotalPrice,
    totalProduct,
    productList,
    setCartProduct,
    getCartProduct,
    removeProductFromCart,
    removeAllProductFromInventory,
    clearCart,
    addOrder,
  } = React.useContext(CartContext);
  return {
    cartTotalPrice,
    totalProduct,
    productList,
    setCartProduct,
    getCartProduct,
    removeProductFromCart,
    removeAllProductFromInventory,
    clearCart,
    addOrder,
  };
}
