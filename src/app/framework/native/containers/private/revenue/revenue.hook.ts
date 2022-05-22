import {RevenueService} from '@app/framework/native/infrastructure';
import {TotalRevenueType} from '@data/models';
import {useEffect, useState} from 'react';

const SecondaryData = [
  {id: 1, name: 'nguyen van 1', revenue: '1.000.000d', mv: '401'},
  {id: 2, name: 'nguyen van 2', revenue: '1.000.000d', mv: '402'},
  {id: 3, name: 'nguyen van 3', revenue: '1.000.000d', mv: '403'},
  {id: 4, name: 'nguyen van 4', revenue: '1.000.000d', mv: '404'},
  {id: 5, name: 'nguyen van 5', revenue: '1.000.000d', mv: '405'},
];
let sort = true;
export function useRevenueModel() {
  const [dataSecodary, setDataSecodary] = useState(SecondaryData);
  const [totalRevenue, setTotalRevenue] = useState<
    TotalRevenueType | undefined
  >();

  useEffect(() => {
    getTotalRevenue();
  }, []);
  async function getTotalRevenue() {
    const getDataTotal = await RevenueService.getTotalRevenie({
      fromDate: '2022-05-21T08:57:29.161Z',
      toDate: '2022-05-21T08:57:29.161Z',
    });
    setTotalRevenue(getDataTotal?.totalRevenue);
  }
  const sortData = () => {
    console.log(sort);
    let dataSort;
    if (sort) {
      dataSort = dataSecodary.sort((a, b) => Number(b.mv) - Number(a.mv));
      sort = false;
    } else {
      dataSort = dataSecodary.sort((a, b) => Number(a.mv) - Number(b.mv));
      sort = true;
    }
    setDataSecodary([...dataSort]);
  };
  return {
    sortData,
    dataSecodary,
    totalRevenue,
  };
}
