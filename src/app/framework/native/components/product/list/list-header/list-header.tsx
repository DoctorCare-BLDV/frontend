import React, {useMemo} from 'react';
import {View, StyleSheet} from 'react-native';

import {Layout} from '@app/resources';
import {useTheme} from '@app/shared/hooks/useTheme';

import {IconButton} from '../../../icon-button';
import {TextView} from '../../../label';

export interface ListHeaderProps {
  title?: string;
  onPressFilter?: () => void;
}

export const ListHeader: React.FC<ListHeaderProps> = ({
  title,
  onPressFilter = () => {},
}) => {
  const theme = useTheme();

  const titleStyle = useMemo(() => {
    return [
      styles.title,
      {
        color: theme.colorScheme.primary,
      },
    ];
  }, [theme]);

  return (
    <View style={StyleSheet.flatten([styles.container])}>
      <TextView style={titleStyle}>{title}</TextView>
      <IconButton name="filter" style={styles.icon} onPress={onPressFilter} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Layout.spacingHorizontal,
    paddingBottom: 0,
  },
  title: {
    fontWeight: '700',
    flex: 1,
  },
  icon: {
    fontSize: 18,
    paddingLeft: 15,
  },
});
