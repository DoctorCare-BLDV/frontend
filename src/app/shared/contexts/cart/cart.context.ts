import {CartLocal, CartLocalProduct} from '@data/models';
import React from 'react';
import {AddOrderHookOptions} from './cart.context-provider';

export type CartContextState = Omit<CartLocal, 'userId'> & {
  cartTotalPrice: number;
  totalProduct: number;
  productList: CartLocalProduct[];
  setCartProduct: (product: CartLocalProduct, quantity?: number) => void;
  removeProductFromCart: (productId: number) => void;
  resetCart: () => void;
  getCartProduct: (productId: number) => CartLocalProduct | undefined;
  removeAllProductFromInventory: (inventoryId: number) => void;
  clearCart: () => void;
  addOrder: (options: AddOrderHookOptions) => void;
};

export const INITIAL_VALUE: CartContextState = {
  cartTotalPrice: 0,
  totalProduct: 0,
  productList: [],
  setCartProduct: () => {},
  resetCart: () => {},
  removeProductFromCart: () => {},
  getCartProduct: () => undefined,
  removeAllProductFromInventory: () => {},
  clearCart: () => {},
  addOrder: () => {},
};

export const CartContext = React.createContext<CartContextState>(INITIAL_VALUE);
