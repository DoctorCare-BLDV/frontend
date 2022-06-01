import {StyleSheet} from 'react-native';
import {Colors} from '@app/resources';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: 150,
    height: 150,
    alignSelf: 'center',
    borderRadius: 75,
    marginVertical: 24,
    borderWidth: 3,
    borderColor: Colors.PRIMARY_ORAGE,
  },
  rowInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  category: {
    fontSize: 15,
    fontWeight: '400',
    lineHeight: 18,
  },
  info: {
    textAlign: 'right',
    fontSize: 15,
    fontWeight: '400',
    lineHeight: 18,
  },
});
