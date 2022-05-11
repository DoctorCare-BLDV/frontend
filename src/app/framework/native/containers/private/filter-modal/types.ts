import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import {PrivateParamList} from '@app/framework/native/navigation';

export type FilterModalNavigationProps = StackNavigationProp<
  PrivateParamList,
  'FilterModal'
>;

export type FilterModalRouteProp = RouteProp<PrivateParamList, 'FilterModal'>;

export type FilterModalProps = {
  navigation: FilterModalNavigationProps;
  route: FilterModalRouteProp;
};
