import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {AuthenticationNavigator} from './authentication-navigator';

export function RootNavigator() {
  return (
    <NavigationContainer>
      <AuthenticationNavigator />
    </NavigationContainer>
  );
}
