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
import {LogBox, StatusBar, StyleSheet} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {
  CartContextProvider,
  FloatingReactionContextProvider,
  NotificationsContextProvider,
  UserContextProvider,
} from '@app/shared/contexts';
import {configureApiProvider} from './infrastructure';
import {RootNavigator} from './routes';
import {QueryClient, QueryClientProvider} from 'react-query';
import FlashMessage from 'react-native-flash-message';
import {FloatingReactionList} from './components';
configureApiProvider();

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

const styles = StyleSheet.create({
  container: {flex: 1},
});

const App = () => {
  const queryClient = new QueryClient();
  return (
    <GestureHandlerRootView style={styles.container}>
      <FloatingReactionContextProvider>
        <QueryClientProvider client={queryClient}>
          <UserContextProvider>
            <CartContextProvider>
              <NotificationsContextProvider>
                <StatusBar barStyle={'dark-content'} />
                <RootNavigator />
                <FlashMessage />

                {/* Last UI Component */}
                <FloatingReactionList />
              </NotificationsContextProvider>
            </CartContextProvider>
          </UserContextProvider>
        </QueryClientProvider>
      </FloatingReactionContextProvider>
    </GestureHandlerRootView>
  );
};

export default App;
