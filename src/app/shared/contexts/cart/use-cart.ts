import React from 'react';
import {CartContext} from './cart.context';
export function useCart() {
  const {
    productList,
    setCartProduct,
    getCartProduct,
    removeProductFromCart,
    removeAllProductFromInventory,
    clearCart,
  } = React.useContext(CartContext);
  return {
    productList,
    setCartProduct,
    getCartProduct,
    removeProductFromCart,
    removeAllProductFromInventory,
    clearCart,
  };
}
