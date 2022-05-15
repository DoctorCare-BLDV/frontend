import React, {useMemo} from 'react';
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';

import {PrivateParamList} from '@native/navigation';
import {Colors} from '@app/resources';
import {useTheme} from '@app/shared/hooks/useTheme';

import BottomTabs from './BottomTabs';
import {
  FilterModal,
  ProductDetail,
  Cart,
  ConfirmationModal,
  OrderConfirmation,
} from '@native/containers';

const Stack = createNativeStackNavigator<PrivateParamList>();

export function PrivateNavigator() {
  const theme = useTheme();

  const rootOptions: NativeStackNavigationOptions = useMemo(() => {
    return {
      headerShown: false,
      contentStyle: {
        backgroundColor: Colors.LIGHT_GRAY_2,
      },
    };
  }, []);

  const headerDefaultStyle: NativeStackNavigationOptions = useMemo(() => {
    return {
      headerTitleAlign: 'center',
      headerTitleStyle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.WHITE,
      },
      headerStyle: {
        backgroundColor: theme.colorScheme.primary,
      },
      headerBackTitle: '',
      headerTintColor: Colors.WHITE,
    };
  }, [theme]);

  const cardOptions: NativeStackNavigationOptions = useMemo(() => {
    return {
      ...headerDefaultStyle,
      headerShown: true,
    };
  }, [headerDefaultStyle]);

  const headerModalStyle: NativeStackNavigationOptions = useMemo(() => {
    return {
      ...headerDefaultStyle,
      headerTitleStyle: [
        headerDefaultStyle.headerTitleStyle,
        {color: Colors.BLACK},
      ],
      headerStyle: {
        backgroundColor: theme.colorScheme.surface,
      },
    };
  }, [theme, headerDefaultStyle]);

  const modalOptions: NativeStackNavigationOptions = useMemo(() => {
    return {
      ...headerModalStyle,
      contentStyle: {
        backgroundColor: undefined,
      },
      headerShown: true,
      presentation: 'transparentModal',
      // animation: 'slide_from_bottom',
    };
  }, [headerModalStyle]);

  return (
    <Stack.Navigator screenOptions={rootOptions}>
      <Stack.Screen name={'BottomTab'} component={BottomTabs} />
      {/* common screen */}
      <Stack.Group screenOptions={cardOptions}>
        <Stack.Screen
          name="ProductDetail"
          options={{
            title: 'Chi tiết sản phẩm',
          }}
          component={ProductDetail}
        />
        <Stack.Screen
          name="Cart"
          options={{
            title: 'Giỏ hàng',
          }}
          component={Cart}
        />
        <Stack.Screen
          name="OrderConfirmation"
          options={{
            title: 'Xác nhận đơn hàng',
          }}
          component={OrderConfirmation}
        />
      </Stack.Group>

      {/* common modal */}
      <Stack.Group screenOptions={modalOptions}>
        <Stack.Screen
          name={'FilterModal'}
          options={({route}) => ({
            title: route.params.headerTitle || 'Bộ lọc',
            headerShown: false,
            animation: 'none',
          })}
          component={FilterModal}
        />
        <Stack.Screen
          name={'ConfirmationModal'}
          options={{
            headerShown: false,
            animation: 'none',
          }}
          component={ConfirmationModal}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
}
