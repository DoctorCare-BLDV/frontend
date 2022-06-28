import type {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';

import {PrivateParamList} from '@native/navigation';

export type GalleryProps = NativeStackScreenProps<PrivateParamList, 'Gallery'>;

export type GalleryNavigationProps = NativeStackNavigationProp<
  PrivateParamList,
  'Gallery'
>;
