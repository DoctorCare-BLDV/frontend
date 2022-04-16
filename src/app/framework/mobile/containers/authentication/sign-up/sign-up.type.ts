import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AuthenticationStoryboardParamList} from '@app/framework/mobile/navigation';

export type SignUpProps = NativeStackScreenProps<
  AuthenticationStoryboardParamList,
  'SignUp'
>;
