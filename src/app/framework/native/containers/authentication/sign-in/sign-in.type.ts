import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AuthenticationParamList} from '@native/navigation';

export type SignInProps = NativeStackScreenProps<
  AuthenticationParamList,
  'SignIn'
>;
