import {CartLocal, CartLocalProduct} from '@data/models';
import React from 'react';

export type CartContextState = Omit<CartLocal, 'userId'> & {
  setCartProduct: (product: CartLocalProduct, quantity?: number) => void;
  removeProductFromCart: (productId: number) => void;
  getCartProduct: (productId: number) => CartLocalProduct | undefined;
  removeAllProductFromInventory: (inventoryId: number) => void;
  clearCart: () => void;
};

export const INITIAL_VALUE: CartContextState = {
  productList: [],
  setCartProduct: () => {},
  removeProductFromCart: () => {},
  getCartProduct: () => undefined,
  removeAllProductFromInventory: () => {},
  clearCart: () => {},
};

export const CartContext = React.createContext<CartContextState>(INITIAL_VALUE);
