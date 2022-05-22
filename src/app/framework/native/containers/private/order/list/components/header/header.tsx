import React, {useCallback, useContext, useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';

import {IconButton, SearchBar} from '@app/framework/native/components';
import {Colors} from '@app/resources';

import {OrderListContext} from '../../order-list.context';

export interface HeaderProps {}

const MESSAGES = {
  SEARCH_BAR_PLACEHOLDER: 'Tìm kiếm đơn hàng',
};

export const Header: React.FC<HeaderProps> = () => {
  const {showFilter, setSearch, index, onSearchByKeyword} =
    useContext(OrderListContext);

  const [text, setText] = useState('');

  const onChangeText = useCallback(
    (value: string) => {
      setText(value);
      setSearch(value);
    },
    [setSearch],
  );

  /* eslint-disable */
  useEffect(() => {
    onChangeText('');
  }, [index]);
  /* eslint-enable */
  return (
    <View style={styles.container}>
      <SearchBar
        value={text}
        // onBlur={onSearchByKeyword}
        onSubmitEditing={onSearchByKeyword}
        onChangeText={onChangeText}
        containerStyle={styles.inputContainer}
        placeholder={MESSAGES.SEARCH_BAR_PLACEHOLDER}
      />
      <IconButton onPress={showFilter} name="filter" style={styles.icon} />
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
