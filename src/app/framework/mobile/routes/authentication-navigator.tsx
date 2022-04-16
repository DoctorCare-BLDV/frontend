import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SignIn, SignUp} from '@mobile/containers';
import {AuthenticationStoryboardParamList} from '@mobile/navigation';

const Stack = createNativeStackNavigator<AuthenticationStoryboardParamList>();

export function AuthenticationNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name={'SignIn'} component={SignIn} />
      <Stack.Screen name={'SignUp'} component={SignUp} />
    </Stack.Navigator>
  );
}
