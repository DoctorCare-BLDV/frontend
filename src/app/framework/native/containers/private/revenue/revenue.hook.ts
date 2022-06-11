import {useCallback, useEffect, useRef, useState} from 'react';
import moment from 'moment';
import {RevenueService} from '@app/framework/native/infrastructure';
import {MemberLevel2, TotalRevenueType} from '@data/models';
import {showMessage} from 'react-native-flash-message';

const SelectDateData = [
  {key: 0, value: 'Hôm nay'},
  {key: 1, value: '30 ngày'},
  {key: 2, value: 'Chọn ngày'},
];
export function useRevenueModel() {
  const [totalRevenue, setTotalRevenue] = useState<
    TotalRevenueType | undefined
  >();
  const [revenueByMonth, setRevenueByMonth] = useState<
    TotalRevenueType | undefined
  >();
  const [dataRevenueLevel2, setRevenueLevel2] = useState<Array<MemberLevel2>>(
    [],
  );
  const [index, setIndex] = useState(0);
  const sortDESC = useRef(false);
  const [onSelect, setOnSelect] = useState(SelectDateData[0].key);
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [month, setMonth] = useState<string | Date>(moment().toDate());
  const currentPage = useRef(0);
  const lastPage = useRef(1);
  const [loading, setLoading] = useState<boolean>(false);
  const timer = useRef<NodeJS.Timeout>();

  const responseTotalRevenue = useCallback(
    async (body: {fromDate?: string; toDate?: string}) => {
      const response = await RevenueService.getTotalRevenue(body);
      if (!!response?.errMessage) {
        return showMessage({
          message: response?.errMessage || '',
          type: 'danger',
        });
      }
      setTotalRevenue(response?.totalRevenue);
    },
    [],
  );

  const fetchDataLevel2 = useCallback(
    async (isLoadMore?: boolean) => {
      if (loading || currentPage.current >= lastPage.current) return;
      setLoading(true);
      const {
        revenueLevel2,
        lastPage: _lastPage,
        errMessage,
      } = await RevenueService.getRevenueLevel2({
        pageIndex: currentPage.current + 1,
        pageSize: 20,
        fromDate: moment(startDate).format('YYYY-MM-DDT00:00:00'),
        toDate: moment(endDate).format('YYYY-MM-DDT23:59:59'),
        sortValues: {
          MV: sortDESC.current ? 'DESC' : 'ASC',
        },
      });
      setLoading(false);
      if (!!errMessage) {
        return showMessage({
          message: errMessage,
          type: 'danger',
        });
      }
      currentPage.current = currentPage.current + 1;
      lastPage.current = _lastPage || currentPage.current + 1;
      setRevenueLevel2(revenueLevel2);
      if (isLoadMore) {
        setRevenueLevel2(pre => pre.concat(revenueLevel2));
      } else {
        setRevenueLevel2(revenueLevel2);
      }
    },
    [endDate, loading, startDate],
  );

  const loadMore = useCallback(() => {
    if (loading) return;
    if (!!timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      fetchDataLevel2(true);
    }, 300);
  }, [fetchDataLevel2, loading]);

  const refreshData = useCallback(() => {
    if (loading) return;
    currentPage.current = 0;
    lastPage.current = 1;
    fetchDataLevel2();
  }, [fetchDataLevel2, loading]);

  const getTotalRevenue = useCallback(async () => {
    const body = {
      fromDate: moment(startDate).format('YYYY-MM-DDT00:00:00'),
      toDate: moment(endDate).format('YYYY-MM-DDT23:59:59'),
    };
    if (onSelect === SelectDateData[2].key && startDate && endDate) {
      responseTotalRevenue(body);
    } else if (onSelect !== SelectDateData[2].key) {
      responseTotalRevenue(body);
    }
  }, [endDate, onSelect, responseTotalRevenue, startDate]);
  /* eslint-disable */
  useEffect(() => {
    if (
      Number(moment(endDate).format('X')) -
        Number(moment(startDate).format('X')) <
      0
    ) {
      setEndDate(startDate);
    }
    if (onSelect === SelectDateData[0].key) {
      setStartDate(moment().toDate());
      setEndDate(moment().toDate());
    } else if (onSelect === SelectDateData[1].key) {
      setStartDate(moment().subtract(1, 'months').toDate());
      setEndDate(moment().toDate());
    }
  }, [onSelect]);
  /* eslint-enable */
  /* eslint-disable */
  useEffect(() => {
    if (index == 0) {
      getTotalRevenue();
    } else {
      refreshData();
    }
  }, [endDate, startDate]);
  /* eslint-enable */

  const getRenevueByMonth = useCallback(async () => {
    const body = {
      time: moment(month).format('YYYY-MM-DD'),
    };
    const response = await RevenueService.getRevenueByMonth(body);
    if (!!response?.errMessage) {
      return showMessage({
        message: response?.errMessage || '',
        type: 'danger',
      });
    }
    setRevenueByMonth(response?.revenueByMonth);
  }, [month]);

  /* eslint-disable */
  useEffect(() => {
    getRenevueByMonth();
  }, [month]);

  useEffect(() => {
    getRenevueByMonth();
    if (index == 0) {
      getTotalRevenue();
    } else {
      refreshData();
    }
  }, [index]);
  /* eslint-enable */

  useEffect(() => {
    setOnSelect(SelectDateData[0].key);
  }, [index]);

  const sortData = useCallback(() => {
    sortDESC.current = !sortDESC.current;
    refreshData();
  }, [refreshData]);

  const onSelectDate = (data: number) => {
    setOnSelect(data);
  };
  return {
    sortData,
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
    dataRevenueLevel2,
    loadMore,
    refreshData,
    loading,
  };
}
