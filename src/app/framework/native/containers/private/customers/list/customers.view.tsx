import React from 'react';
import {View} from 'react-native';
// import from library
// import from alias
import {Tabbar} from '@native/components';
// localImport
import {UsecustomersModel} from './customers.hook';
import {customersProps} from './customers.type';
import {styles} from './customers.style';
import {Header} from './components';
import {Client, CustomerLevel2} from './components';
const Tab = [
  {key: 'level2', name: 'DS Cấp 2'},
  {key: 'customer', name: 'DS Khách hàng'},
];

const Customers: React.FC<customersProps> = props => {
  const {navigation} = props;
  const {
    index,
    setIndex,
    dataAllCustomers,
    loading,
    refreshData,
    loadMore,
    dataCustomerLevel2,
    setSearch,
    onSearchByKeyword,
  } = UsecustomersModel();

  return (
    <View style={[styles.container]}>
      <Tabbar list={Tab} currentIdx={index} onChangeTab={setIndex} />
      <Header
        index={index}
        setSearch={setSearch}
        onSearchByKeyword={onSearchByKeyword}
      />
      {index === 0 && (
        <CustomerLevel2
          navigation={navigation}
          data={dataCustomerLevel2}
          loading={loading}
          refreshData={refreshData}
          loadMore={loadMore}
        />
      )}
      {index === 1 && (
        <Client
          data={dataAllCustomers}
          loading={loading}
          refreshData={refreshData}
          loadMore={loadMore}
        />
      )}
    </View>
  );
};

export const Customer = React.memo(Customers);
