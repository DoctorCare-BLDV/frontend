import React, {useEffect, useMemo, useRef} from 'react';
import {
  View,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TouchableOpacity,
} from 'react-native';

import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useIsFocused} from '@react-navigation/native';

import {IconButton, SearchBar} from '@app/framework/native/components';
import {useTheme} from '@app/shared/hooks/useTheme';
import {Colors} from '@app/resources';
import {useFloatingReaction} from '@app/shared/contexts';

export interface HeaderProps {
  wrapperStyle?: StyleProp<ViewStyle>;
}

const MESSAGES = {
  SEARCH_BAR_PLACEHOLDER: 'Tìm kiếm sản phẩm',
};

export const Header: React.FC<HeaderProps> = ({wrapperStyle}) => {
  const theme = useTheme();
  const {top} = useSafeAreaInsets();
  const cartRef = useRef<any>();
  const {setFloatingReactionTarget} = useFloatingReaction();
  const isFocused = useIsFocused();

  useEffect(() => {
    if (cartRef.current && isFocused) {
      // @ts-ignore
      cartRef.current.measure((x, y, width, height, pageX, pageY) => {
        setFloatingReactionTarget({
          x: pageX,
          y: pageY,
          width,
          height,
        });
      });
    }
  }, [isFocused, setFloatingReactionTarget]);

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

  return (
    <TouchableOpacity style={wrapperBaseStyle}>
      <View style={containerStyle}>
        <SearchBar
          pointerEvents="none"
          editable={false}
          containerStyle={styles.inputContainer}
          placeholder={MESSAGES.SEARCH_BAR_PLACEHOLDER}
        />
        <View style={styles.iconContainer}>
          <IconButton name="bell" badge={10} style={styles.icon} />
        </View>
        <View style={styles.iconContainer}>
          <IconButton ref={cartRef} name="cart-plus" style={styles.icon} />
        </View>
      </View>
    </TouchableOpacity>
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
