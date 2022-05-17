import React, {useCallback, useMemo} from 'react';
import {View, StyleSheet, StyleProp, ViewStyle} from 'react-native';

import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';

import {
  CartButton,
  IconButton,
  SearchBar,
} from '@app/framework/native/components';
import {useTheme} from '@app/shared/hooks/useTheme';
import {Colors} from '@app/resources';

export interface HeaderProps {
  wrapperStyle?: StyleProp<ViewStyle>;
}

const MESSAGES = {
  SEARCH_BAR_PLACEHOLDER: 'Tìm kiếm sản phẩm',
};

export const Header: React.FC<HeaderProps> = ({wrapperStyle}) => {
  const theme = useTheme();
  const {top} = useSafeAreaInsets();
  const productSearchNavigation = useNavigation<any>();
  const notificationsNavigation = useNavigation<any>();

  const wrapperBaseStyle = useMemo(() => {
    return [
      styles.wrapper,
      {
        paddingTop: top,
        backgroundColor: theme.colorScheme.surface,
      },
      wrapperStyle,
    ];
  }, [theme, top, wrapperStyle]);

  const containerStyle = useMemo(() => {
    return [
      styles.container,
      !!top && {
        paddingTop: 0,
      },
    ];
  }, [top]);

  const goToProductSearch = useCallback(() => {
    productSearchNavigation.navigate('ProductSearch');
  }, [productSearchNavigation]);

  const goToNotifications = useCallback(() => {
    notificationsNavigation.navigate('Notifications');
  }, [notificationsNavigation]);

  return (
    <View style={wrapperBaseStyle}>
      <View style={containerStyle}>
        <SearchBar
          pointerEvents="none"
          editable={false}
          containerStyle={styles.inputContainer}
          placeholder={MESSAGES.SEARCH_BAR_PLACEHOLDER}
          onPress={goToProductSearch}
        />
        <View style={styles.iconContainer}>
          <IconButton
            name="bell"
            badge={10}
            style={styles.icon}
            onPress={goToNotifications}
          />
        </View>
        <View style={styles.iconContainer}>
          <CartButton />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    shadowColor: Colors.BLACK,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.1,
    shadowRadius: 5,

    elevation: 5,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  inputContainer: {
    flex: 1,
  },
  iconContainer: {
    marginLeft: 16,
  },
  icon: {},
});
