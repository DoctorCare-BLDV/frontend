import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {useLaunchScreen, useUser} from '@app/shared/contexts';

import {AuthenticationNavigator} from './authentication.navigator';
import {PrivateNavigator} from './private';
import {LaunchAppNavigator} from './launch-screen.navigator';

export function RootNavigator() {
  const {user} = useUser();
  const {isOnLaunchScreen} = useLaunchScreen();
  const renderNavigator = () => {
    if (isOnLaunchScreen) {
      return <LaunchAppNavigator />;
    }
    if (user) {
      return <PrivateNavigator />;
    }
    return <AuthenticationNavigator />;
  };
  return <NavigationContainer>{renderNavigator()}</NavigationContainer>;
}
