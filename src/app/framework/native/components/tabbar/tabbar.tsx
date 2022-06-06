import React, {useEffect, useMemo, useRef} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import Animated, {Easing} from 'react-native-reanimated';
import {AppDimensions, Colors} from '@app/resources';
import {TextView} from '../label';

export interface TabbarProps {
  list: TabbarItem[];
  onChangeTab: (idx: number) => void;
  currentIdx: number;
}

export interface TabbarItem {
  name: string;
  key: string;
  total?: number;
}

const Tab = React.memo(
  ({
    item,
    index,
    currentIdx,
    onPress,
  }: {
    item: TabbarItem;
    index: number;
    currentIdx: number;
    onPress: () => void;
  }) => {
    const width = useRef(new Animated.Value(0));
    const idx = useRef(index);

    useEffect(() => {
      if (idx.current === currentIdx) {
        Animated.timing(width.current, {
          toValue: AppDimensions.width / 2,
          duration: 100,
          easing: Easing.linear,
        }).start();
      } else {
        Animated.timing(width.current, {
          toValue: 0,
          duration: 100,
          easing: Easing.linear,
        }).start();
      }
    }, [currentIdx]);

    const title = useMemo(() => {
      if (!!item.total) {
        return `${item.name} (${item.total})`;
      }
      return item.name;
    }, [item]);
    return (
      <TouchableOpacity
        onPress={onPress}
        style={styles.tabWrapper}
        key={index.toString()}>
        <TextView
          style={index === currentIdx ? styles.activeText : styles.normalText}>
          {title}
        </TextView>
        <Animated.View style={[styles.divider, {width: width.current}]} />
      </TouchableOpacity>
    );
  },
);

export const Tabbar: React.FC<TabbarProps> = props => {
  const {list, onChangeTab, currentIdx} = props;

  return (
    <View style={StyleSheet.flatten([styles.container])}>
      {list.map((tab, index) => (
        <Tab
          key={index.toString()}
          currentIdx={currentIdx}
          onPress={() => onChangeTab(index)}
          item={tab}
          index={index}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    borderBottomColor: Colors.LIGHT_GRAY,
    borderBottomWidth: 1,
  },
  activeText: {
    fontWeight: '500',
    fontSize: 15,
    lineHeight: 18,
    color: Colors.PRIMARY_ORANGE,
  },
  normalText: {
    fontSize: 15,
    lineHeight: 18,
  },
  tabWrapper: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  divider: {
    width: '100%',
    height: 2,
    backgroundColor: Colors.PRIMARY_ORANGE,
    position: 'absolute',
    bottom: 0,
  },
});
