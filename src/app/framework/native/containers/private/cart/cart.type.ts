import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {PrivateParamList} from '@native/navigation';
import {StackNavigationProp} from '@react-navigation/stack';

export type CartProps = NativeStackScreenProps<PrivateParamList, 'Cart'>;

export type CarNavigationProps = StackNavigationProp<PrivateParamList, 'Cart'>;
