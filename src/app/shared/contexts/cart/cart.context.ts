import {CartLocal, CartLocalProduct} from '@data/models';
import React from 'react';
import {AddOrderHookOptions} from './cart.context-provider';

export type CartContextState = Omit<CartLocal, 'userId'> & {
  cartTotalPrice: number;
  setCartProduct: (product: CartLocalProduct, quantity?: number) => void;
  removeProductFromCart: (productId: number) => void;
  getCartProduct: (productId: number) => CartLocalProduct | undefined;
  removeAllProductFromInventory: (inventoryId: number) => void;
  clearCart: () => void;
  addOrder: (options: AddOrderHookOptions) => void;
};

export const INITIAL_VALUE: CartContextState = {
  cartTotalPrice: 0,
  productList: [],
  setCartProduct: () => {},
  removeProductFromCart: () => {},
  getCartProduct: () => undefined,
  removeAllProductFromInventory: () => {},
  clearCart: () => {},
  addOrder: () => {},
};

export const CartContext = React.createContext<CartContextState>(INITIAL_VALUE);
