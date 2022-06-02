import {useCallback, useEffect, useState} from 'react';
import {showMessage} from 'react-native-flash-message';
import {CustomerService} from '@app/framework/native/infrastructure';
import {detailProps} from './detail.type';

export function UsedetailModel(props: detailProps) {
  const {id} = props.route.params;
  const [customerDetail, setCustomers] = useState<any>();
  const getCustomerDetail = useCallback(async () => {
    const {errorMessage, customer} = await CustomerService.fetchCustomerDetail(
      id,
    );
    if (!customer) {
      props.navigation.goBack();
      showMessage({
        message: errorMessage,
        type: 'danger',
      });
      return;
    }
    setCustomers(customer);
  }, [id, props.navigation]);

  /* eslint-disable */
  useEffect(() => {
    getCustomerDetail();
  }, []);
  /* eslint-enable */

  return {
    customerDetail,
    getCustomerDetail,
  };
}
