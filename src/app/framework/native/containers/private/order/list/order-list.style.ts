import {Colors} from '@app/resources';
import {StyleSheet} from 'react-native';
import {getStatusBarHeight} from 'react-native-iphone-x-helper';

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
});
