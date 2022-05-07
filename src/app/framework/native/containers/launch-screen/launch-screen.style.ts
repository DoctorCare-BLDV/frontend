import {StyleSheet} from 'react-native';
import {isIphoneX} from 'react-native-iphone-x-helper';
import {AppDimensions, Colors} from '@app/resources';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
    alignItems: 'center',
  },
  logo: {
    marginTop: 100,
    width: AppDimensions.width * 0.7,
    height: AppDimensions.width * 0.7,
  },
  loading: {
    position: 'absolute',
    bottom: isIphoneX() ? 60 : 40,
  },
});
