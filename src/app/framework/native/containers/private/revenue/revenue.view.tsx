import React from 'react';
import {TouchableOpacity, View} from 'react-native';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';
import DatePicker from 'react-native-date-picker';

import {Tabbar, TextView} from '@app/framework/native/components';
import {Colors} from '@app/resources';

import {styles} from './revenue.style';
import {useRevenueModel} from './revenue.hook';
import {RevenueProps} from './revenue.type';
import {SecondaryRevenue, TotalRevenue} from './components';

const Tab = [
  {key: 'total', name: 'Doanh thu tổng'},
  {key: 'secondary', name: 'Doanh thu cấp hai'},
];

const _Revenue: React.FC<RevenueProps> = () => {
  const [index, setIndex] = React.useState(0);
  const [openCalendar, setOpenCalendar] = React.useState(false);
  const {dataSecodary, sortData, totalRevenue, date, setDate} =
    useRevenueModel();
  return (
    <View style={styles.container}>
      <Tabbar list={Tab} currentIdx={index} onChangeTab={setIndex} />
      {index === 0 && (
        <TotalRevenue
          openCalendar={() => {
            setOpenCalendar(true);
          }}
          date={date}
          data={totalRevenue}
        />
      )}
      {index === 1 && (
        <SecondaryRevenue
          data={dataSecodary}
          openCalendar={() => {
            setOpenCalendar(true);
          }}
          sortData={sortData}
        />
      )}
      <View style={[styles.row, styles.footer]}>
        <View style={[styles.infoFooter, styles.row, styles.spaceBetween]}>
          <TouchableOpacity
            style={styles.row}
            onPress={() => setOpenCalendar(true)}>
            <FontAwesome
              name="calendar"
              color={Colors.PRIMARY_ORAGE}
              size={16}
            />
            <TextView style={styles.textFooter} color={Colors.PRIMARY_ORAGE}>
              Tháng {moment(date).format('M')}
            </TextView>
          </TouchableOpacity>
          <TextView style={styles.textFooter} color={Colors.PRIMARY_ORAGE}>
            36.600.000đ
          </TextView>
        </View>
        <View style={styles.status}>
          <TextView style={styles.textStatus}>Chưa thanh toán</TextView>
        </View>
      </View>
      <DatePicker
        modal
        open={openCalendar}
        date={date}
        maximumDate={new Date()}
        mode={'date'}
        onConfirm={value => {
          setOpenCalendar(false);
          setDate(value);
        }}
        onCancel={() => {
          setOpenCalendar(false);
        }}
      />
    </View>
  );
};
export const Revenue = React.memo(_Revenue);
