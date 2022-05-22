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
export function useRevenueModel() {
  const [dataSecodary, setDataSecodary] = useState(SecondaryData);
  const [totalRevenue, setTotalRevenue] = useState<
    TotalRevenueType | undefined
  >();
  const [date, setDate] = useState(new Date());
  const sort = useRef(true);

  const getTotalRevenue = useCallback(async () => {
    const body = {
      fromDate: moment(date).format('YYYY-MM-DDT00:00:00'),
      toDate: moment(date).format('YYYY-MM-DDT24:00:00'),
    };
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
  }, [date]);

  useEffect(() => {
    getTotalRevenue();
  }, [getTotalRevenue]);

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
  return {
    sortData,
    dataSecodary,
    totalRevenue,
    date,
    setDate,
  };
}
