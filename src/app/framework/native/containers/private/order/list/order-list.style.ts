import {StyleSheet} from 'react-native';
import {getStatusBarHeight} from 'react-native-iphone-x-helper';
import {AppDimensions, Colors, Layout} from '@app/resources';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: getStatusBarHeight(true),
    backgroundColor: Colors.WHITE,
  },
  list: {
    flex: 1,
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: Colors.LIGHT_GRAY,
  },
  emptyWrapper: {
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: AppDimensions.height * 0.2,
  },
  emptyText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.DIM_BLACK,
    marginTop: Layout.hitSlop.top,
  },
  emptyIcon: {
    color: Colors.DIM_BLACK,
  },
});
