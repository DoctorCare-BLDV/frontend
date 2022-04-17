import React from 'react';
import {Button} from 'react-native';
// import from library
import {SafeAreaView} from 'react-native-safe-area-context';
// import from alias
import {Text} from '@native/components';
// localImport
import {useSignInModel} from './sign-in.hook';
import {SignInProps} from './sign-in.type';
import {styles} from './sign-in.style';

const _SignIn: React.FC<SignInProps> = props => {
  const {navigation} = props;
  const {} = useSignInModel();

  return (
    <SafeAreaView style={[styles.container]}>
      <Text />
      <Button title="Tst" onPress={() => navigation.navigate('SignUp')} />
    </SafeAreaView>
  );
};

export const SignIn = React.memo(_SignIn);
