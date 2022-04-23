import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {ListProducts} from '@native/containers';
import CustomTab from './CustomTab';
import {BottomTabsParamList} from '@app/framework/native/navigation';

const Tab = createBottomTabNavigator<BottomTabsParamList>();

const BottomTabs: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={{headerShown: false}}
      tabBar={props => <CustomTab {...props} />}>
      <Tab.Screen
        name="ListProducts"
        options={{title: 'Trang chủ'}}
        component={ListProducts}
      />
      <Tab.Screen
        name="Orders"
        options={{title: 'Đơn hàng'}}
        component={ListProducts}
      />
      <Tab.Screen
        name="Revenue"
        options={{title: 'Doanh thu'}}
        component={ListProducts}
      />
      <Tab.Screen
        name="Customers"
        options={{title: 'Khách hàng'}}
        component={ListProducts}
      />
      <Tab.Screen
        name="Profile"
        options={{title: 'Hồ sơ'}}
        component={ListProducts}
      />
    </Tab.Navigator>
  );
};

export default BottomTabs;
