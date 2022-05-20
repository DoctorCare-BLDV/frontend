import React, {useMemo} from 'react';
import {View, StyleSheet, ActivityIndicator} from 'react-native';

import {HIT_SLOP, Layout} from '@app/resources';
import {useTheme} from '@app/shared/hooks/useTheme';

import {IconButton} from '../../../icon-button';
import {TextView} from '../../../label';

export interface ListHeaderProps {
  title?: string;
  isLoading?: boolean;
  onPressFilter?: () => void;
}

export const ListHeader: React.FC<ListHeaderProps> = ({
  title,
  isLoading,
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
    <View style={styles.container}>
      <TextView style={titleStyle}>{title}</TextView>

      <View>
        <IconButton
          hitSlop={HIT_SLOP}
          disabled={isLoading}
          name="filter"
          style={[styles.icon, isLoading && styles.hideIcon]}
          onPress={onPressFilter}
        />
        {isLoading && (
          <View
            style={{
              ...StyleSheet.absoluteFillObject,
              left: undefined,
            }}>
            <ActivityIndicator size="small" />
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Layout.spacingHorizontal,
    paddingBottom: 10,
  },
  title: {
    fontWeight: '700',
    flex: 1,
  },
  icon: {
    fontSize: 18,
    paddingLeft: 15,
  },
  hideIcon: {
    opacity: 0,
  },
});
