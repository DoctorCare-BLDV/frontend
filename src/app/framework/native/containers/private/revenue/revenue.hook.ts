import {useCallback, useEffect, useRef, useState} from 'react';
import moment from 'moment';
import {RevenueService} from '@app/framework/native/infrastructure';
import {TotalRevenueType} from '@data/models';
import {showMessage} from 'react-native-flash-message';

const SecondaryData = [
  {id: 1, name: 'nguyen van 1', revenue: '1.000.000d', mv: '401'},
  {id: 2, name: 'nguyen van 2', revenue: '1.000.000d', mv: '402'},
  {id: 3, name: 'nguyen van 3', revenue: '1.000.000d', mv: '403'},
  {id: 4, name: 'nguyen van 4', revenue: '1.000.000d', mv: '404'},
  {id: 5, name: 'nguyen van 5', revenue: '1.000.000d', mv: '405'},
];

const SelectDateData = [
  {key: 0, value: '7 ngày'},
  {key: 1, value: '30 ngày'},
  {key: 2, value: 'Chọn ngày'},
];
export function useRevenueModel() {
  const [dataSecodary, setDataSecodary] = useState(SecondaryData);
  const [totalRevenue, setTotalRevenue] = useState<
    TotalRevenueType | undefined
  >();
  const [revenueByMonth, setRevenueByMonth] = useState<
    TotalRevenueType | undefined
  >();
  const [index, setIndex] = useState(0);
  const sort = useRef(true);
  const [onSelect, setOnSelect] = useState(SelectDateData[0].key);
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [month, setMonth] = useState<Date>();

  const responseTotalRevenue = useCallback(async (body: any) => {
    const response = await RevenueService.getTotalRevenue(body);
    if (!!response?.errMessage) {
      return showMessage({
        message: response?.errMessage || '',
        type: 'danger',
      });
    }
    if (!response?.totalRevenue) {
      return showMessage({
        message: 'Đã có lỗi xảy ra, vui lòng thử lại sau',
        type: 'danger',
      });
    }
    setTotalRevenue(response?.totalRevenue);
  }, []);

  const getTotalRevenue = useCallback(async () => {
    let start;
    let end;
    if (
      Number(moment(endDate).format('X')) -
        Number(moment(startDate).format('X')) <
      0
    ) {
      setEndDate(startDate);
    }
    if (onSelect === SelectDateData[0].key) {
      start = moment().format('YYYY-MM-DD');
      end = moment().subtract(1, 'weeks').format('YYYY-MM-DD');
    } else if (onSelect === SelectDateData[1].key) {
      start = moment().format('YYYY-MM-DD');
      end = moment().subtract(1, 'months').format('YYYY-MM-DD');
    } else if (onSelect === SelectDateData[2].key && startDate && endDate) {
      start = moment(startDate).format('YYYY-MM-DD');
      end = moment(endDate).format('YYYY-MM-DD');
    }
    const body = {
      fromDate: start,
      toDate: end,
    };
    if (onSelect === SelectDateData[2].key && startDate && endDate) {
      responseTotalRevenue(body);
    } else if (onSelect !== SelectDateData[2].key) {
      responseTotalRevenue(body);
    }
  }, [endDate, onSelect, responseTotalRevenue, startDate]);

  const getRenevueByMonth = useCallback(async () => {
    const body = {
      time: moment(month).format('YYYY-MM-DDT24:00:00'),
    };
    const response = await RevenueService.getRevenueByMonth(body);
    if (!!response?.errMessage) {
      return showMessage({
        message: response?.errMessage || '',
        type: 'danger',
      });
    }
    if (!response?.getRevenueByMonth) {
      return showMessage({
        message: 'Đã có lỗi xảy ra, vui lòng thử lại sau',
        type: 'danger',
      });
    }
    setRevenueByMonth(response?.getRevenueByMonth);
  }, [month]);

  useEffect(() => {
    getTotalRevenue();
    getRenevueByMonth();
  }, [getRenevueByMonth, getTotalRevenue]);
  useEffect(() => {
    setOnSelect(SelectDateData[0].key);
  }, [index]);

  useEffect(() => {}, [startDate, endDate]);
  const sortData = useCallback(() => {
    let dataSort;
    if (sort.current) {
      dataSort = dataSecodary.sort((a, b) => Number(b.mv) - Number(a.mv));
      sort.current = false;
    } else {
      dataSort = dataSecodary.sort((a, b) => Number(a.mv) - Number(b.mv));
      sort.current = true;
    }
    setDataSecodary([...dataSort]);
  }, [dataSecodary]);

  const onSelectDate = (data: number) => {
    setOnSelect(data);
  };
  return {
    sortData,
    dataSecodary,
    totalRevenue,
    onSelect,
    onSelectDate,
    SelectDateData,
    startDate,
    endDate,
    setStartDate,
    setEndDate,
    index,
    setIndex,
    revenueByMonth,
    setMonth,
    month,
  };
}
