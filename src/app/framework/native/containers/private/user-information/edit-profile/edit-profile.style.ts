import {Colors} from '@app/resources';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  saveText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.WHITE,
  },
  alertWrapper: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginTop: 8,
  },
  alertText: {
    fontSize: 12,
    color: Colors.PRIMARY_ORAGE,
    flex: 1,
    marginLeft: 6,
  },
});
