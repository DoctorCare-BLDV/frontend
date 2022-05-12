import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import {PrivateParamList} from '@app/framework/native/navigation';

export type ConfirmationModalNavigationProps = StackNavigationProp<
  PrivateParamList,
  'ConfirmationModal'
>;

export type ConfirmationModalRouteProp = RouteProp<
  PrivateParamList,
  'ConfirmationModal'
>;

export type ConfirmationModalProps = {
  navigation: ConfirmationModalNavigationProps;
  route: ConfirmationModalRouteProp;
};
