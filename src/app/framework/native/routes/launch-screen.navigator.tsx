import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {LaunchScreen} from '@native/containers';

const Stack = createNativeStackNavigator();

const screenOptions = {
  headerShown: false,
};
export function LaunchAppNavigator() {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name={'LaunchScreen'} component={LaunchScreen} />
    </Stack.Navigator>
  );
}
