import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {PrivateParamList} from '@native/navigation';
import {BottomTabNavigator} from './bottom-tab.navigator';

const Stack = createNativeStackNavigator<PrivateParamList>();

export function PrivateNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name={'BottomTab'} component={BottomTabNavigator} />
    </Stack.Navigator>
  );
}
