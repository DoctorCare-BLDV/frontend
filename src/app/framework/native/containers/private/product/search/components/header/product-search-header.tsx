import React, {useMemo, useCallback} from 'react';
import {View, StyleSheet} from 'react-native';

import {Header, HeaderBackButton} from '@react-navigation/elements';
import {useNavigation} from '@react-navigation/native';

import {
  CartButton,
  SearchBar,
  SearchBarProps,
} from '@app/framework/native/components';
import {useTheme} from '@app/shared/hooks/useTheme';

export interface ProductSearchHeaderProps extends SearchBarProps {}

export const MESSAGES = {
  PLACEHOLDER: 'Tìm kiếm sản phẩm...',
};

export const ProductSearchHeader: React.FC<ProductSearchHeaderProps> = ({
  ...props
}) => {
  const navigation = useNavigation();
  const theme = useTheme();

  const containerStyle = useMemo(() => {
    return [
      styles.container,
      {
        backgroundColor: theme.colorScheme.primary,
      },
    ];
  }, [theme]);

  const renderBack = useCallback(
    headerProps => {
      return <HeaderBackButton onPress={navigation.goBack} {...headerProps} />;
    },
    [navigation],
  );

  const renderSearchBar = useCallback(() => {
    return <SearchBar placeholder={MESSAGES.PLACEHOLDER} {...props} />;
  }, [props]);

  const renderCart = useCallback(({tintColor}) => {
    return (
      <CartButton
        iconStyle={{color: tintColor}}
        containerStyle={styles.cartContainer}
      />
    );
  }, []);

  return (
    <View>
      <Header
        title=""
        headerTitle={renderSearchBar}
        headerLeft={renderBack}
        headerRight={renderCart}
        headerTintColor={theme.colorScheme.onPrimary}
        headerStyle={containerStyle}
        headerTitleContainerStyle={styles.titleContainer}
        headerLeftContainerStyle={styles.headerSideContainer}
        headerRightContainerStyle={styles.headerSideContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  titleContainer: {
    flexGrow: 1,
    maxWidth: undefined,
    marginLeft: 0,
  },
  headerSideContainer: {
    flexGrow: undefined,
    flexBasis: undefined,
  },
  cartContainer: {
    marginRight: 15,
  },
});
