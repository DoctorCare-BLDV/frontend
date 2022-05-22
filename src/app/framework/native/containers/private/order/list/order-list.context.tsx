import React, {
  createContext,
  memo,
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from 'react';
import {Alert} from 'react-native';
import {showMessage} from 'react-native-flash-message';
import {RowItemType} from '@app/framework/native/components';
import {OrderService} from '@app/framework/native/infrastructure';
import {OrderStatusFilter} from '@app/resources';
import {IOrder, ORDER_STATUS} from '@data/models';
import {OrderListProps} from './order-list.type';

export const OrderListContext = createContext<{
  showFilter: () => void;
  index: number;
  setIndex: React.Dispatch<React.SetStateAction<number>>;
  setSearch: (value: string) => void;
  onSearchByKeyword: () => void;
  refreshData: () => void;
  loadMore: () => void;
  loading: boolean;
  data: IOrder[];
  cancelOrder: (orderId: number) => void;
  fullScreenLoading: boolean;
}>({
  index: 0,
  setIndex: () => null,
  showFilter: () => null,
  data: [],
  loading: false,
  setSearch: () => null,
  onSearchByKeyword: () => null,
  refreshData: () => null,
  loadMore: () => null,
  cancelOrder: () => null,
  fullScreenLoading: false,
});

interface FilterItem {
  id: number;
  label: string;
}

export const OrderListProvider = memo(
  ({children, navigation}: PropsWithChildren<OrderListProps>) => {
    const [index, setIndex] = React.useState(0);
    const filter = useRef<FilterItem[]>([]);
    const search = useRef<string>('');
    const [loading, setLoading] = React.useState<boolean>(false);
    // const [total, setTotal] = React.useState<{unDone: number; done: number}>({
    //   done: 0,
    //   unDone: 0,
    // });
    const [fullScreenLoading, setFullScreenLoading] =
      React.useState<boolean>(false);
    const [data, setData] = React.useState<IOrder[]>([]);
    const currentPage = useRef(0);
    const lastPage = useRef(1);

    const fetchData = useCallback(async () => {
      if (loading || currentPage.current >= lastPage.current) return;
      setLoading(true);
      const status = index === 0 ? '1, 2, 3' : '4, 5';
      const {
        order,
        lastPage: _lastPage,
        errorMessage,
      } = await OrderService.fetchOrder({
        pageIndex: currentPage.current + 1,
        keyword: search.current,
        status:
          filter.current.length > 0
            ? filter.current.map(i => i.id).join(', ')
            : status,
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
      setData(order.map(i => ({...i, key: i.orderId})));
    }, [filter, index, loading]);

    const setSearch = useCallback((value: string) => {
      search.current = value;
    }, []);

    const loadMore = useCallback(() => {
      if (loading) return;
      fetchData();
    }, [fetchData, loading]);

    const refreshData = useCallback(() => {
      if (loading) return;
      search.current = '';
      filter.current = [];
      currentPage.current = 0;
      lastPage.current = 1;
      fetchData();
    }, [fetchData, loading]);

    const UndoneOrderFilter = useMemo(() => {
      return OrderStatusFilter.filter(i => i.id > 0 && !i.finishedStatus).map(
        i => ({
          ...i,
          type: RowItemType.CHECK_BOX,
        }),
      );
    }, []);

    const FinishedOrderFilter = useMemo(() => {
      return OrderStatusFilter.filter(i => i.id > 0 && i.finishedStatus).map(
        i => ({
          ...i,
          type: RowItemType.CHECK_BOX,
        }),
      );
    }, []);

    const onFilter = useCallback(
      (e: FilterItem[]) => {
        currentPage.current = 0;
        lastPage.current = 1;
        filter.current = e;
        refreshData();
      },
      [refreshData],
    );

    const showFilter = useCallback(() => {
      navigation.navigate('FilterModal', {
        selectedData: filter.current.map(i => ({
          ...i,
          type: RowItemType.CHECK_BOX,
        })),
        data: [
          {
            title: '',
            data: index === 0 ? UndoneOrderFilter : FinishedOrderFilter,
          },
        ],
        onFinishSelectOptions: (e: any) => onFilter(e),
      });
    }, [index, navigation, onFilter, UndoneOrderFilter, FinishedOrderFilter]);

    const cancelOrder = useCallback(
      async (orderId: number) => {
        Alert.alert(
          'Hủy đơn hàng?',
          'Bạn có chắc chắn muốn hủy đơn hàng không?',
          [
            {text: 'Không', style: 'cancel'},
            {
              text: 'Hủy đơn',
              style: 'destructive',
              onPress: async () => {
                setFullScreenLoading(true);
                const errorMessage = await OrderService.updateStatus({
                  orderId,
                  status: ORDER_STATUS.CANCEL,
                });
                setFullScreenLoading(false);
                refreshData();
                showMessage({
                  message: errorMessage || 'Hủy đơn thành công',
                  type: !!errorMessage ? 'danger' : 'success',
                });
              },
            },
          ],
        );
      },
      [refreshData],
    );

    const onSearchByKeyword = useCallback(() => {
      currentPage.current = 0;
      lastPage.current = 1;
      fetchData();
    }, [fetchData]);
    /* eslint-disable */
    useEffect(() => {
      refreshData();
    }, [index]);
    /* eslint-enable */

    return (
      <OrderListContext.Provider
        value={{
          fullScreenLoading,
          setSearch,
          index,
          setIndex,
          onSearchByKeyword,
          showFilter,
          loadMore,
          data,
          loading,
          cancelOrder,
          refreshData,
        }}>
        {children}
      </OrderListContext.Provider>
    );
  },
);