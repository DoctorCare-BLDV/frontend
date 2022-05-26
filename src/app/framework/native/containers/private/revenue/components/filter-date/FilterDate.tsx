import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';

import {TextView} from '@app/framework/native/components';
import {Colors} from '@app/resources';
interface FilterDateProps {
  SelectDateData: Array<{key: number; value: string}>;
  onSelectDate: (value: number) => void;
  onSelect: number;
  startDate?: Date;
  endDate?: Date;
  setPopupStartDate: (value: boolean) => void;
  setPopupEndDate: (value: boolean) => void;
}

export const FilterDate = React.memo((props: FilterDateProps) => {
  const {
    SelectDateData,
    onSelectDate,
    onSelect,
    endDate,
    setPopupEndDate,
    setPopupStartDate,
    startDate,
  } = props;
  return (
    <>
      <View style={[styles.row, styles.spaceBetween, styles.date]}>
        {SelectDateData.map(v => {
          return (
            <TouchableOpacity
              onPress={() => onSelectDate(v.key)}
              style={[
                styles.selectDate,
                v.key === SelectDateData[2].key ? [styles.row] : {},
              ]}>
              {v.key === SelectDateData[2].key && (
                <FontAwesome
                  name="calendar"
                  color={
                    onSelect === v.key ? Colors.PRIMARY_ORAGE : Colors.GRAY
                  }
                  size={16}
                  style={styles.iconCalendar}
                />
              )}
              <TextView
                color={onSelect === v.key ? Colors.PRIMARY_ORAGE : Colors.GRAY}>
                {v.value}
              </TextView>
            </TouchableOpacity>
          );
        })}
      </View>
      {onSelect === SelectDateData[2].key && (
        <View style={styles.viewSelectDate}>
          <TouchableOpacity
            onPress={() => setPopupStartDate(true)}
            style={styles.startDate}>
            <TextView color={startDate ? Colors.BLACK : Colors.BLACK_60}>
              {startDate ? moment(startDate).format('DD/MM/YYYY') : 'Từ ngày'}
            </TextView>
          </TouchableOpacity>
          <TextView>-</TextView>
          <TouchableOpacity
            disabled={startDate ? false : true}
            onPress={() => setPopupEndDate(true)}
            style={styles.startDate}>
            <TextView color={endDate ? Colors.BLACK : Colors.BLACK_60}>
              {endDate ? moment(endDate).format('DD/MM/YYYY') : 'Đến ngày'}
            </TextView>
          </TouchableOpacity>
        </View>
      )}
    </>
  );
});
const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  spaceBetween: {
    justifyContent: 'space-between',
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
