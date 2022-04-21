import React from 'react';
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';
import {PrivateParamList} from '@native/navigation';
import BottomTabs from './BottomTabs';
import {
  // Colors,
  LightTheme,
} from '@app/resources';

const Stack = createNativeStackNavigator<PrivateParamList>();

const rootOptions: NativeStackNavigationOptions = {
  headerShown: false,
  contentStyle: {
    backgroundColor: LightTheme.colorScheme.screenBackground,
  },
};

// const headerDefaultStyle: NativeStackNavigationOptions = {
//   headerTitleAlign: 'center',
//   headerTitleStyle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: Colors.WHITE,
//   },
//   headerStyle: {
//     backgroundColor: LightTheme.colorScheme.primary,
//   },
//   headerBackTitle: '',
//   headerTintColor: Colors.WHITE,
// };

// const cardOptions: NativeStackNavigationOptions = {
//   ...headerDefaultStyle,
//   headerShown: true,
// };

// const headerModalStyle: NativeStackNavigationOptions = {
//   ...headerDefaultStyle,
//   headerTitleStyle: [
//     headerDefaultStyle.headerTitleStyle,
//     {color: Colors.BLACK},
//   ],
//   headerStyle: {
//     backgroundColor: LightTheme.colorScheme.background,
//   },
// };

// const modalOptions: NativeStackNavigationOptions = {
//   ...headerModalStyle,
//   contentStyle: {
//     backgroundColor: undefined,
//   },
//   headerShown: true,
//   presentation: 'transparentModal',
//   // animation: 'slide_from_bottom',
// };

export function PrivateNavigator() {
  return (
    <Stack.Navigator screenOptions={rootOptions}>
      <Stack.Screen name={'BottomTab'} component={BottomTabs} />
    </Stack.Navigator>
  );
}
