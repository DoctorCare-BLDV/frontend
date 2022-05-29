import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import moment from 'moment';
import DatePicker from 'react-native-date-picker';
// @ts-ignore
import ScrollPicker from 'react-native-picker-scrollview';
import Modal from 'react-native-modal';
import {Colors} from '@app/resources';
import {TextView} from '@app/framework/native/components';

require('moment/locale/vi');
moment.locale('vi');
interface DatePickerProps {
  open?: boolean;
  onConfirm?: (value: Date) => void;
  onCancel: () => void;
  date?: any;
  type?: string;
  onChangeMonth?: (value: any) => void;
  minimumDate?: Date;
}
export const DatePickerComponent = React.memo((props: DatePickerProps) => {
  const {
    open,
    onConfirm,
    onCancel,
    date = new Date(),
    type,
    onChangeMonth,
    minimumDate,
  } = props;
  const [isVisible, setVisible] = useState<boolean | undefined>(false);
  const [yearIndex, setYearIndex] = useState(0);
  const [monthIndex, setMonthIndex] = useState(0);
  const [isMaxDate, setMaxDate] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState(
    date ? moment(date) : moment(),
  );

  const changeValue = useCallback(
    (value: any, isType: 'year' | 'month') => {
      const changed = selectedDate
        .clone()
        .set(isType, isType === 'month' ? value - 1 : value);
      setSelectedDate(changed);
    },
    [selectedDate],
  );
  const arrYear = useMemo(
    () =>
      Array.from({length: 500}, (_, i) => {
        return i + 1900;
      }),
    [],
  );
  const arrMonth = useMemo(() => {
    return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].filter(month => {
      return month;
    });
  }, []);

  useEffect(() => {
    setVisible(open);
    const yearInd = arrYear.findIndex(el => el === selectedDate.year());
    const monthInd = arrMonth.findIndex(el => el === selectedDate.month() + 1);
    setMonthIndex(monthInd);
    setYearIndex(yearInd);
  }, [arrMonth, arrYear, open, selectedDate]);

  useEffect(() => {
    if (moment(selectedDate).year() > moment().year()) {
      setMaxDate(true);
    } else {
      if (
        moment(selectedDate).month() > moment().month() &&
        moment(selectedDate).year() >= moment().year()
      ) {
        setMaxDate(true);
      } else {
        setMaxDate(false);
      }
    }
  }, [selectedDate]);

  const onClose = () => {
    setVisible(!isVisible);
    onCancel();
  };

  const confirmMonth = useCallback(() => {
    if (onChangeMonth) onChangeMonth(selectedDate.toDate());
    onCancel();
  }, [onCancel, onChangeMonth, selectedDate]);
  console.log('isVisible', isVisible);
  return (
    <>
      {type === 'month' ? (
        <>
          <Modal
            // onModalHide={onClose}
            onBackdropPress={onClose}
            onBackButtonPress={onClose}
            style={styles.modal}
            isVisible={isVisible}>
            <View style={styles.bodyModal}>
              <View style={styles.btn}>
                <TouchableOpacity onPress={onClose}>
                  <TextView color={Colors.PRIMARY_BLUE} style={styles.textbtn}>
                    Huỷ
                  </TextView>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => confirmMonth()}
                  disabled={isMaxDate}>
                  <TextView
                    style={styles.textbtn}
                    color={isMaxDate ? Colors.GRAY : Colors.PRIMARY_BLUE}>
                    Xác nhận
                  </TextView>
                </TouchableOpacity>
              </View>
              <View style={styles.viewSelectDate}>
                <ScrollPicker
                  dataSource={arrMonth}
                  selectedIndex={monthIndex}
                  style={styles.picker}
                  itemHeight={50}
                  wrapperHeight={160}
                  wrapperColor={Colors.WHITE}
                  highlightColor={'#DEDEDE'}
                  renderItem={(
                    data: number,
                    index: number,
                    isSelected: boolean,
                  ) => {
                    return (
                      <View>
                        <TextView
                          color={isSelected ? Colors.BLACK : Colors.GRAY}
                          style={styles.textDate}>
                          Tháng {data}
                        </TextView>
                      </View>
                    );
                  }}
                  onValueChange={(data: number) => {
                    changeValue(data, 'month');
                  }}
                />
                <ScrollPicker
                  dataSource={arrYear}
                  selectedIndex={yearIndex}
                  style={styles.picker}
                  itemHeight={50}
                  wrapperHeight={160}
                  wrapperColor={Colors.WHITE}
                  highlightColor={'#DEDEDE'}
                  renderItem={(
                    data: number,
                    index: number,
                    isSelected: boolean,
                  ) => {
                    return (
                      <View>
                        <TextView
                          color={isSelected ? Colors.BLACK : Colors.GRAY}
                          style={styles.textDate}>
                          {data}
                        </TextView>
                      </View>
                    );
                  }}
                  onValueChange={(data: number) => {
                    changeValue(data, 'year');
                  }}
                />
              </View>
            </View>
          </Modal>
        </>
      ) : (
        <DatePicker
          title={null}
          modal
          open={open}
          date={date}
          maximumDate={new Date()}
          minimumDate={minimumDate}
          mode={'date'}
          onConfirm={onConfirm}
          onCancel={onCancel}
          confirmText={'Xác nhận'}
          cancelText={'Huỷ'}
        />
      )}
    </>
  );
});
const styles = StyleSheet.create({
  modal: {
    margin: 0,
    justifyContent: 'flex-end',
  },
  bodyModal: {
    backgroundColor: Colors.WHITE,
    paddingBottom: 40,
  },
  viewSelectDate: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  picker: {
    flex: 1,
  },
  textDate: {
    fontSize: 18,
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderColor: Colors.LIGHT_GRAY,
  },
  textbtn: {
    fontSize: 16,
    fontWeight: '500',
  },
});
