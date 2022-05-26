import moment from 'moment';
import React from 'react';
import DatePicker from 'react-native-date-picker';
import MonthPicker from 'react-native-month-year-picker';

require('moment/locale/vi');
moment.locale('vi');
interface DatePickerProps {
  open?: boolean;
  onConfirm?: (value: Date) => void;
  onCancel?: () => void;
  date?: any;
  type?: string;
  onChangeMonth?: (event: any, newDate: any) => void;
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
  return (
    <>
      {type === 'month' ? (
        <>
          {open ? (
            <MonthPicker
              onChange={onChangeMonth}
              value={date}
              maximumDate={new Date()}
              okButton={'Xác nhận'}
              cancelButton={'Huỷ'}
            />
          ) : null}
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
