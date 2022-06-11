import React, {memo} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {getBottomSpace} from 'react-native-iphone-x-helper';
import Modal from 'react-native-modal';
import {Colors} from '@app/resources';

export interface ActionItem {
  icon: any;
  title: string;
  onPress: () => void;
}

export interface ActionSheetProps {
  visible: boolean;
  onClose: () => void;
  data: ActionItem[];
  headerComponent?: React.ReactElement;
}

export const ActionSheet = memo((props: ActionSheetProps) => {
  const {data, onClose, visible, headerComponent} = props;

  const onChooseImg = React.useCallback(
    (i: ActionItem) => {
      onClose();
      setTimeout(() => {
        i.onPress?.();
      }, 350);
    },
    [onClose],
  );

  if (!data.length) return null;

  return (
    <Modal
      style={styles.modal}
      onModalHide={onClose}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
      isVisible={visible}>
      <View style={styles.container}>
        {headerComponent}
        {data.map((i, index) => (
          <TouchableOpacity
            style={[styles.item, index > 0 ? styles.border : {}]}
            onPress={() => onChooseImg(i)}
            key={index}>
            <Image style={styles.icon} source={i.icon} />
            <Text style={styles.title}>{i.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </Modal>
  );
});

const styles = StyleSheet.create({
  modal: {margin: 0, justifyContent: 'flex-end'},
  container: {
    backgroundColor: Colors.WHITE,
    paddingBottom: getBottomSpace(),
  },
  item: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  border: {
    borderTopWidth: 1,
    borderTopColor: Colors.LIGHT_GRAY,
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  title: {
    flex: 1,
    fontWeight: '400',
    fontSize: 14,
  },
});
