import React from 'react';
import {FlatList, View} from 'react-native';
// import from library
// import from alias
import {Order, Tabbar} from '@native/components';
// localImport
import {useOrderListModel} from './order-list.hook';
import {OrderListProps} from './order-list.type';
import {styles} from './order-list.style';
import {Header} from './components';

const Tab = [
  {key: 'process', name: 'Chưa hoàn thành', total: 15},
  {key: 'done', name: 'Đã hoàn thành', total: 4},
];

const _OrderList: React.FC<OrderListProps> = props => {
  const {} = props;
  const {} = useOrderListModel();
  const [index, setIndex] = React.useState(0);

  return (
    <View style={styles.container}>
      <Tabbar list={Tab} currentIdx={index} onChangeTab={setIndex} />
      <Header />
      <FlatList
        ItemSeparatorComponent={() => <View style={styles.divider} />}
        style={styles.list}
        data={[1, 2, 3, 4, 5]}
        renderItem={() => <Order />}
      />
    </View>
  );
};

export const OrderList = React.memo(_OrderList);
