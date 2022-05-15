import type {CompositeScreenProps} from '@react-navigation/native';
import type {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {BottomTabsParamList, PrivateParamList} from '@native/navigation';

export type EditProfileProps = CompositeScreenProps<
  BottomTabScreenProps<BottomTabsParamList>,
  NativeStackScreenProps<PrivateParamList, 'EditProfile'>
>;
