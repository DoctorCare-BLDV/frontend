import type {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {PrivateParamList} from '@native/navigation';

export type NotificationsProps = NativeStackScreenProps<
  PrivateParamList,
  'Notifications'
>;

export type NotificationsNavigationProps = NativeStackNavigationProp<
  PrivateParamList,
  'Notifications'
>;
