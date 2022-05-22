import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {PrivateParamList} from '@native/navigation';
import {StackNavigationProp} from '@react-navigation/stack';

export type RevenueProps = NativeStackScreenProps<PrivateParamList, 'Revenue'>;

export type RevenueNavigationProps = StackNavigationProp<
  PrivateParamList,
  'Revenue'
>;
export interface TotalRevenueProps {
  openCalendar: () => void;
  date: Date;
  data?: any;
}

export interface SecondaryRevenueProps {
  openCalendar: () => void;
  data: Array<any>;
  sortData: () => void;
}
