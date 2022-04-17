import React from 'react';
import {} from 'react-native';
// import from library
import {SafeAreaView} from 'react-native-safe-area-context';
// import from alias
import {Text} from '@native/components';
// localImport
import {useSignUpModel} from './sign-up.hook';
import {SignUpProps} from './sign-up.type';
import {styles} from './sign-up.style';

const _SignUp: React.FC<SignUpProps> = props => {
  const {} = props;
  const {} = useSignUpModel();

  return (
    <SafeAreaView style={[styles.container]}>
      <Text />
    </SafeAreaView>
  );
};

export const SignUp = React.memo(_SignUp);
