import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {PrivateParamList} from '@native/navigation';
import {RouteProp} from '@react-navigation/native';

export type ProductDetailNavigationProps = NativeStackNavigationProp<
  PrivateParamList,
  'ProductDetail'
>;

export type ProductDetailRouteProp = RouteProp<
  PrivateParamList,
  'ProductDetail'
>;

export type ProductDetailProps = {
  navigation: ProductDetailNavigationProps;
  route: ProductDetailRouteProp;
};
