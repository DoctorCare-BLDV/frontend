import {StyleSheet} from 'react-native';
import {Layout} from '@app/resources';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  totalProfitContainer: {
    flexDirection: 'row',
    padding: Layout.spacingHorizontal,
    borderBottomWidth: 2,
    zIndex: 1,
    justifyContent: 'space-between',
  },
  totalProfitText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
