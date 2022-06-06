import {Colors} from '@app/resources';
import {StyleSheet} from 'react-native';
import {getStatusBarHeight} from 'react-native-iphone-x-helper';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: getStatusBarHeight(true),
    backgroundColor: Colors.WHITE,
  },
  body: {
    flex: 1,
  },
  padding: {
    paddingVertical: 16,
    paddingHorizontal: 12,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  spaceBetween: {
    justifyContent: 'space-between',
  },
  titleRevenue: {
    fontSize: 16,
    color: Colors.PRIMARY_ORANGE,
    fontWeight: '700',
  },

  footer: {
    alignItems: 'center',
  },
  infoFooter: {
    backgroundColor: Colors.LIGHT_GRAY_4,
    flexGrow: 7,
    padding: 15,
  },
  textFooter: {
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 4,
  },
  status: {
    backgroundColor: Colors.WARNING,
    alignItems: 'center',
    padding: 14,
  },
  textStatus: {
    color: Colors.WHITE,
    fontSize: 16,
    fontWeight: '600',
  },
  iconCalendar: {
    marginRight: 10,
  },
  startDate: {
    borderWidth: 1,
    borderColor: Colors.LIGHT_GRAY,
    borderRadius: 2,
    padding: 8,
    width: '45%',
    paddingHorizontal: 20,
  },
  alignItem: {
    alignItems: 'center',
  },
  selectDate: {
    backgroundColor: Colors.LIGHT_GRAY_4,
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginTop: 10,
    width: '30%',
  },
  date: {
    paddingHorizontal: 12,
  },
  viewSelectDate: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
    paddingHorizontal: 12,
  },
});
