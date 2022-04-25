import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {useUser} from '@app/shared/contexts';

import {AuthenticationNavigator} from './authentication.navigator';
import {PrivateNavigator} from './private';

export function RootNavigator() {
  const {user} = useUser();
  const renderNavigator = () => {
    if (user) {
      return <PrivateNavigator />;
    }
    return <AuthenticationNavigator />;
  };
  return <NavigationContainer>{renderNavigator()}</NavigationContainer>;
}
