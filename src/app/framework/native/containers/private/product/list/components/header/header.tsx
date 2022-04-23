import React, {useMemo} from 'react';
import {View, StyleSheet} from 'react-native';

import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {IconButton, SearchBar} from '@app/framework/native/components';
import {useTheme} from '@app/shared/hooks/useTheme';

export interface HeaderProps {}

const MESSAGES = {
  SEARCH_BAR_PLACEHOLDER: 'Tìm kiếm sản phẩm',
};

export const Header: React.FC<HeaderProps> = () => {
  const theme = useTheme();
  const {top} = useSafeAreaInsets();

  const wrapperStyle = useMemo(() => {
    return [
      styles.wrapper,
      {
        paddingTop: top,
        backgroundColor: theme.colorScheme.surface,
      },
    ];
  }, [theme, top]);

  const containerStyle = useMemo(() => {
    return [
      styles.container,
      !!top && {
        paddingTop: 0,
      },
    ];
  }, [top]);

  return (
    <View style={wrapperStyle}>
      <View style={containerStyle}>
        <SearchBar
          pointerEvents="none"
          containerStyle={styles.inputContainer}
          placeholder={MESSAGES.SEARCH_BAR_PLACEHOLDER}
        />
        <IconButton name="bell" badge={10} style={styles.icon} />
        <IconButton name="cart-plus" style={styles.icon} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 16,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  inputContainer: {
    flex: 1,
  },
  icon: {
    marginLeft: 16,
  },
});
