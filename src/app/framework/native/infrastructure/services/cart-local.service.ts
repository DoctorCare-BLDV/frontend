import {CartLocal} from '@data/models';
import AsyncStorage from '@react-native-community/async-storage';

export class _CartLocalService {
  saveCart(cart: CartLocal) {
    AsyncStorage.setItem('cart', JSON.stringify(cart));
  }

  clearCart() {
    AsyncStorage.removeItem('cart');
  }

  async getCart() {
    return await AsyncStorage.getItem('cart');
  }
}

export const CartLocalService = new _CartLocalService();
