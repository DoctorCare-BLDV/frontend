import {useLaunchScreen} from '@app/shared/contexts';
import React, {useEffect} from 'react';
import {} from 'react-native';

export function useLaunchScreenModel() {
  const {checkAuthentication} = useLaunchScreen();

  const init = React.useCallback(async () => {
    checkAuthentication();
  }, [checkAuthentication]);

  useEffect(() => {
    init();
  }, [init]);
  return {};
}
