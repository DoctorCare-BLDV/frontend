import {Colors, Layout} from '@app/resources';
import {StyleSheet} from 'react-native';
import {getBottomSpace} from 'react-native-iphone-x-helper';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  scrollview: {
    flex: 1,
  },
  listContentContainer: {
    paddingBottom: Layout.spacingHorizontal,
  },
  row: {
    flexDirection: 'row',
    backgroundColor: Colors.LIGHT_GRAY_4,
    alignItems: 'center',
    paddingBottom: getBottomSpace(),
  },
  priceTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.PRIMARY_ORAGE,
    marginLeft: 16,
  },
  priceValue: {
    flex: 1,
    fontSize: 14,
    fontWeight: '500',
    color: Colors.PRIMARY_ORAGE,
    marginRight: 16,
    textAlign: 'right',
  },
  btnWrapper: {
    height: 50,
    width: 110,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.PRIMARY_ORAGE,
  },
  btnText: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.WHITE,
  },
});
