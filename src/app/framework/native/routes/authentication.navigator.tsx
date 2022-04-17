import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SignIn, SignUp} from '@native/containers';
import {AuthenticationParamList} from '@native/navigation';

const Stack = createNativeStackNavigator<AuthenticationParamList>();

export function AuthenticationNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name={'SignIn'} component={SignIn} />
      <Stack.Screen name={'SignUp'} component={SignUp} />
    </Stack.Navigator>
  );
}
