import React from 'react';
import {TouchableOpacity, View} from 'react-native';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';

import {Tabbar, TextView} from '@app/framework/native/components';
import {Colors, vndCurrencyFormat} from '@app/resources';

import {styles} from './revenue.style';
import {useRevenueModel} from './revenue.hook';
import {RevenueProps} from './revenue.type';
import {
  DatePickerComponent,
  FilterDate,
  SecondaryRevenue,
  TotalRevenue,
} from './components';

const Tab = [
  {key: 'total', name: 'Doanh thu tổng'},
  {key: 'secondary', name: 'Doanh thu cấp hai'},
];

const _Revenue: React.FC<RevenueProps> = () => {
  const [popupStartDate, setPopupStartDate] = React.useState(false);
  const [popupEndDate, setPopupEndDate] = React.useState(false);
  const [popupMonth, setPopupMonth] = React.useState(false);
  const {
    dataSecodary,
    sortData,
    totalRevenue,
    onSelectDate,
    onSelect,
    startDate,
    endDate,
    SelectDateData,
    setStartDate,
    setEndDate,
    index,
    setIndex,
    month,
    setMonth,
    revenueByMonth,
  } = useRevenueModel();

  return (
    <View style={styles.container}>
      <Tabbar list={Tab} currentIdx={index} onChangeTab={setIndex} />
      <FilterDate
        SelectDateData={SelectDateData}
        onSelectDate={value => onSelectDate(value)}
        onSelect={onSelect}
        startDate={startDate}
        endDate={endDate}
        setPopupEndDate={value => setPopupEndDate(value)}
        setPopupStartDate={value => setPopupStartDate(value)}
      />
      {index === 0 && <TotalRevenue data={totalRevenue} />}
      {index === 1 && (
        <SecondaryRevenue data={dataSecodary} sortData={sortData} />
      )}
      <View style={[styles.row, styles.footer]}>
        <View style={[styles.infoFooter, styles.row, styles.spaceBetween]}>
          <TouchableOpacity
            style={styles.row}
            onPress={() => setPopupMonth(true)}>
            <FontAwesome
              name="calendar"
              color={Colors.PRIMARY_ORAGE}
              size={16}
            />
            <TextView style={styles.textFooter} color={Colors.PRIMARY_ORAGE}>
              Tháng {moment(month).format('M')}
            </TextView>
          </TouchableOpacity>
          <TextView style={styles.textFooter} color={Colors.PRIMARY_ORAGE}>
            {vndCurrencyFormat(revenueByMonth?.totalRevenue)}
          </TextView>
        </View>
        <View style={styles.status}>
          <TextView style={styles.textStatus}>Chưa thanh toán</TextView>
        </View>
      </View>
      <DatePickerComponent
        open={popupStartDate}
        date={startDate}
        onCancel={() => setPopupStartDate(false)}
        onConfirm={value => (setStartDate(value), setPopupStartDate(false))}
        type={'date'}
      />
      <DatePickerComponent
        open={popupEndDate}
        date={endDate}
        onCancel={() => setPopupEndDate(false)}
        onConfirm={value => (setEndDate(value), setPopupEndDate(false))}
        type={'date'}
        minimumDate={startDate}
      />
      <DatePickerComponent
        open={popupMonth}
        date={month}
        onCancel={() => setPopupMonth(false)}
        onChangeMonth={(event, newDate) => (
          setMonth(newDate), setPopupMonth(false)
        )}
        type={'month'}
      />
    </View>
  );
};
export const Revenue = React.memo(_Revenue);
