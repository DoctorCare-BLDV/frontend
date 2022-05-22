import React, {useCallback} from 'react';
import {
  TouchableOpacity,
  View,
  ListRenderItemInfo,
  StyleSheet,
} from 'react-native';
// import from library
import {RowMap} from 'react-native-swipe-list-view';
import {faTrashCan} from '@fortawesome/free-solid-svg-icons';
import {Icon} from '@fortawesome/fontawesome-svg-core';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
// import from alias
import {Colors, Layout} from '@app/resources';
import {TextView} from '@app/framework/native/components';
import {IOrder, ORDER_STATUS} from '@data/models';
// localImport

export const RightActions = React.memo(
  (props: {
    rowMap: RowMap<IOrder>;
    data: ListRenderItemInfo<IOrder>;
    onAction: () => void;
  }) => {
    const {rowMap, data, onAction} = props;
    const closeRow = useCallback(() => {
      if (!data.item.key) return;
      if (rowMap[data.item.key]) rowMap[data.item.key].closeRow();
    }, [data, rowMap]);
    console.log('----props', props);

    const onPress = useCallback(() => {
      onAction();
      closeRow();
    }, [closeRow, onAction]);

    if (data.item.status !== ORDER_STATUS.CONFIRMING) {
      closeRow();
      return null;
    }

    return (
      <View style={styles.btnWrapper}>
        <TouchableOpacity style={[styles.tagRedWrapper]} onPress={onPress}>
          <FontAwesomeIcon
            icon={faTrashCan as Icon}
            size={20}
            color={Colors.WHITE}
          />
          <TextView style={styles.btnText}>{'Hủy'}</TextView>
        </TouchableOpacity>
      </View>
    );
  },
);

export const styles = StyleSheet.create({
  tagRedWrapper: {
    backgroundColor: Colors.RED,
    flex: 1,
    padding: Layout.spacingBetweenLine,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnWrapper: {
    flexDirection: 'row',
    height: '100%',
    width: 70,
    position: 'absolute',
    right: 0,
  },
  btnText: {
    color: Colors.WHITE,
    fontWeight: 'bold',
    fontSize: 11,
    marginTop: Layout.spacingBetweenLine,
  },
});
