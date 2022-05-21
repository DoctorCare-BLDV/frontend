import React from 'react';
import {FlatList, TouchableOpacity, View} from 'react-native';
import {RevenueProps} from './revenue.type';
import {styles} from './revenue.style';
import {Tabbar, TextView} from '@app/framework/native/components';
import {Colors} from '@app/resources';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';

const Tab = [
  {key: 'total', name: 'Doanh thu tổng'},
  {key: 'secondary', name: 'Doanh thu cấp hai'},
];
const CategoriesRevenue = [
  {key: 'Doanh thu đơn', value: ''},
  {key: 'Tổng MV của cấp 2', value: ''},
  {key: 'Doanh thu cấp 2', value: ''},
  {key: 'Tổng doanh thu', value: ''},
];
const SecondaryData = [
  {id: 1, name: 'nguyen van 1', revenue: '1.000.000d', mv: '401'},
  {id: 2, name: 'nguyen van 2', revenue: '1.000.000d', mv: '402'},
  {id: 3, name: 'nguyen van 3', revenue: '1.000.000d', mv: '403'},
  {id: 4, name: 'nguyen van 4', revenue: '1.000.000d', mv: '404'},
  {id: 5, name: 'nguyen van 5', revenue: '1.000.000d', mv: '405'},
];
let sort = true;

const _Revenue: React.FC<RevenueProps> = () => {
  const [index, setIndex] = React.useState(0);
  const [date, setDate] = React.useState(new Date());
  const [openCalendar, setOpenCalendar] = React.useState(false);
  const [dataSecodary, setDataSecodary] = React.useState(SecondaryData);

  const sortData = () => {
    let dataSort;
    if (sort) {
      dataSort = dataSecodary.sort((a, b) => Number(b.mv) - Number(a.mv));
      sort = false;
    } else {
      dataSort = dataSecodary.sort((a, b) => Number(a.mv) - Number(b.mv));
      sort = true;
    }
    console.log(dataSort);
    setDataSecodary(dataSort);
  };
  console.log(dataSecodary);
  return (
    <View style={styles.container}>
      <Tabbar list={Tab} currentIdx={index} onChangeTab={setIndex} />
      {index === 0 && (
        <TotalRevenue
          openCalendar={() => {
            setOpenCalendar(true);
          }}
          date={date}
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
          <View style={styles.row}>
            <TouchableOpacity onPress={() => setOpenCalendar(true)}>
              <FontAwesome
                name="calendar"
                color={Colors.PRIMARY_ORAGE}
                size={16}
              />
            </TouchableOpacity>
            <TextView style={styles.textFooter} color={Colors.PRIMARY_ORAGE}>
              Tháng {moment(date).format('M')}
            </TextView>
          </View>
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

interface TotalRevenueProps {
  openCalendar: () => void;
  date: Date;
}

const TotalRevenue = React.memo((props: TotalRevenueProps) => {
  const date =
    moment(props.date).format('DD/MM/YYYY') === moment().format('DD/MM/YYYY')
      ? 'hôm nay'
      : moment(props.date).format('DD/MM/YYYY');
  return (
    <>
      <View style={[styles.body, styles.padding]}>
        <View style={[styles.row, styles.spaceBetween]}>
          <TextView style={styles.titleRevenue}>{`Doanh thu ${date}`}</TextView>
          <TouchableOpacity onPress={() => props.openCalendar()}>
            <FontAwesome
              name="calendar"
              color={Colors.PRIMARY_ORAGE}
              size={24}
            />
          </TouchableOpacity>
        </View>
        {CategoriesRevenue.map(v => {
          return (
            <View key={v.key} style={[styles.row, styles.infoCategories]}>
              <TextView style={styles.textCategories}>{v.key}: </TextView>
              <TextView
                style={styles.valueCategories}
                color={Colors.PRIMARY_ORAGE}>
                1.000.000đ
              </TextView>
            </View>
          );
        })}
      </View>
    </>
  );
});

interface SecondaryRevenueProps {
  openCalendar: () => void;
  data: Array<any>;
  sortData: () => void;
}
const SecondaryRevenue = React.memo((props: SecondaryRevenueProps) => {
  console.log(props.data);
  const renderItem = React.useCallback(({item}) => {
    return (
      <View style={[styles.row, styles.spaceBetween, styles.infoSecondary]}>
        <TextView style={[styles.textSecondary, styles.flex40]}>
          {item.name}
        </TextView>
        <TextView style={[styles.textSecondary, styles.flex30]}>
          {item.revenue}
        </TextView>
        <TextView style={styles.flex30}>{item.mv}</TextView>
      </View>
    );
  }, []);
  return (
    <>
      <View style={styles.body}>
        <View
          style={[
            styles.row,
            styles.spaceBetween,
            styles.alignStart,
            styles.padding,
          ]}>
          <View style={[styles.row, styles.alignStart]}>
            <FontAwesome5
              name={'info-circle'}
              color={Colors.PRIMARY_ORAGE}
              size={20}
            />
            <View style={styles.infoMV}>
              <TextView style={styles.textTotal}>Tổng MV: 4400</TextView>
              <TextView style={styles.textTotal}>Tổng lợi nhuận: 4400</TextView>
            </View>
          </View>
          <TouchableOpacity onPress={() => props.openCalendar()}>
            <FontAwesome
              name="calendar"
              color={Colors.PRIMARY_ORAGE}
              size={24}
            />
          </TouchableOpacity>
        </View>
        <View style={[styles.row, styles.table, styles.spaceBetween]}>
          <TextView style={[styles.textTable, styles.flex40]}>
            Tên cấp hai
          </TextView>
          <TextView style={[styles.textTable, styles.flex30]}>
            Doanh thu
          </TextView>
          <TouchableOpacity
            onPress={() => props.sortData()}
            style={[styles.row, styles.flex30, styles.justifyEnd]}>
            <TextView style={[styles.textTable]}>MV</TextView>
            <FontAwesome
              style={styles.iconSort}
              name="sort"
              size={18}
              color={Colors.PRIMARY_ORAGE}
            />
          </TouchableOpacity>
        </View>
        <FlatList
          keyExtractor={(item, index) => String(item.id || index)}
          data={props.data}
          renderItem={renderItem}
        />
      </View>
    </>
  );
});
