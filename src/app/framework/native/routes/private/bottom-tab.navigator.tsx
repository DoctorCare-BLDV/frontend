import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {BottomTabsParamList} from '@native/navigation';
import {SignIn} from '@native/containers';

const Tab = createBottomTabNavigator<BottomTabsParamList>();

export const BottomTabNavigator: React.FC = () => {
  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
      <Tab.Screen
        name="Home"
        options={{title: 'Trang chủ'}}
        component={SignIn}
      />
    </Tab.Navigator>
  );
};
