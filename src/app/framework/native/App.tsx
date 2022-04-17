/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {UserContextProvider} from '@app/shared/contexts';
import {configureApiProvider} from './infrastructure';
import {RootNavigator} from './routes';

configureApiProvider();

const App = () => {
  return (
    <UserContextProvider>
      <RootNavigator />
    </UserContextProvider>
  );
};

export default App;
