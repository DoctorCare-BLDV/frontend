import {useCallback, useEffect, useRef, useState} from 'react';
import {showMessage} from 'react-native-flash-message';
import {CustomerService} from '@app/framework/native/infrastructure';
import {GetAllCustomersResponse, ICustomer} from '@data/models';
import {useUser} from '@app/shared/contexts';

export function UsecustomersModel() {
  const {user} = useUser();
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [dataAllCustomers, setDataAllCustomers] = useState<
    GetAllCustomersResponse[]
  >([]);
  const [dataCustomerLevel2, setDataCustomerLevel2] = useState<ICustomer[]>([]);
  const currentPage = useRef(0);
  const lastPage = useRef(1);
  const search = useRef<string>('');
  const timer = useRef<NodeJS.Timeout>();

  const getAllCustomer = useCallback(
    async (isLoadMore?: boolean) => {
      if (loading || currentPage.current >= lastPage.current) return;
      setLoading(true);
      const {
        allCustomers,
        lastPage: _lastPage,
        errorMessage,
      } = await CustomerService.fetchAllCustomers({
        pageIndex: currentPage.current + 1,
        keyword: search.current,
        doctorId: user?.userInfoId,
      });
      setLoading(false);
      if (!!errorMessage) {
        return showMessage({
          message: errorMessage,
          type: 'danger',
        });
      }
      currentPage.current = currentPage.current + 1;
      lastPage.current = _lastPage || currentPage.current + 1;
      if (isLoadMore) {
        setDataAllCustomers(pre =>
          pre.concat(allCustomers.map(i => ({...i, key: i.orderId}))),
        );
      } else {
        setDataAllCustomers(allCustomers.map(i => ({...i, key: i.orderId})));
      }
    },
    [loading, user?.userInfoId],
  );

  const getCustomerLevel2 = useCallback(
    async (isLoadMore?: boolean) => {
      if (loading || currentPage.current >= lastPage.current) return;
      setLoading(true);
      const {
        customersLevel2,
        lastPage: _lastPage,
        errorMessage,
      } = await CustomerService.fetchCustomersLevel2({
        pageIndex: currentPage.current + 1,
        keyword: search.current,
      });
      setLoading(false);
      if (!!errorMessage) {
        return showMessage({
          message: errorMessage,
          type: 'danger',
        });
      }
      currentPage.current = currentPage.current + 1;
      lastPage.current = _lastPage || currentPage.current + 1;
      if (isLoadMore) {
        setDataCustomerLevel2(pre =>
          pre.concat(customersLevel2.map(i => ({...i, key: i.userInfoId}))),
        );
      } else {
        setDataCustomerLevel2(
          customersLevel2.map(i => ({...i, key: i.userInfoId})),
        );
      }
    },
    [loading],
  );

  const refreshData = useCallback(() => {
    if (loading) return;
    currentPage.current = 0;
    lastPage.current = 1;
    search.current = '';
    if (index === 0) {
      getCustomerLevel2();
    } else {
      getAllCustomer();
    }
  }, [getAllCustomer, getCustomerLevel2, index, loading]);

  const loadMore = useCallback(() => {
    if (loading) return;
    if (!!timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      if (index === 0) {
        getCustomerLevel2(true);
      } else {
        getAllCustomer(true);
      }
    }, 300);
  }, [getAllCustomer, getCustomerLevel2, index, loading]);

  const setSearch = useCallback((value: string) => {
    search.current = value;
  }, []);

  const onSearchByKeyword = useCallback(() => {
    currentPage.current = 0;
    lastPage.current = 1;
    if (index === 0) {
      getCustomerLevel2();
    } else {
      getAllCustomer();
    }
  }, [getAllCustomer, getCustomerLevel2, index]);

  /* eslint-disable */
  useEffect(() => {
    currentPage.current = 0;
    lastPage.current = 1;
    refreshData();
  }, [index]);

  /* eslint-enable */
  return {
    index,
    setIndex,
    dataAllCustomers,
    loading,
    refreshData,
    loadMore,
    dataCustomerLevel2,
    setSearch,
    onSearchByKeyword,
  };
}
