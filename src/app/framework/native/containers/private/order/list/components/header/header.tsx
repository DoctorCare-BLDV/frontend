import React from 'react';
import {View, StyleSheet} from 'react-native';
import {IconButton, SearchBar} from '@app/framework/native/components';
import {Colors} from '@app/resources';

export interface HeaderProps {}

const MESSAGES = {
  SEARCH_BAR_PLACEHOLDER: 'Tìm kiếm đơn hàng',
};

export const Header: React.FC<HeaderProps> = () => {
  return (
    <View style={styles.container}>
      <SearchBar
        pointerEvents="none"
        editable={false}
        containerStyle={styles.inputContainer}
        placeholder={MESSAGES.SEARCH_BAR_PLACEHOLDER}
      />
      <IconButton name="filter" style={styles.icon} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomColor: Colors.LIGHT_GRAY,
    borderBottomWidth: 1,
  },
  inputContainer: {
    flex: 1,
  },
  icon: {
    marginLeft: 25,
  },
});
