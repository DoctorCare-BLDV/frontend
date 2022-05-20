import React from 'react';
import {View, StyleSheet} from 'react-native';

import {FormInput} from '@app/framework/native/components';
import {Layout} from '@app/resources';

export interface CustomerInformationProps {}

const MESSAGES = {
  CUSTOMER_NAME: 'Tên khách hàng',
  PHONE_NUMBER: 'Số điện thoại',
  ADDRESS: 'Địa chỉ',
};

export const CustomerInformation: React.FC<
  CustomerInformationProps
> = props => {
  const {} = props;
  return (
    <View style={styles.container}>
      <FormInput
        labelContainerStyle={styles.formInputLabelContainer}
        label={MESSAGES.CUSTOMER_NAME}
        containerStyle={styles.formInputContainer}
      />
      <FormInput
        labelContainerStyle={styles.formInputLabelContainer}
        label={MESSAGES.PHONE_NUMBER}
        containerStyle={styles.formInputContainer}
      />
      <FormInput
        labelContainerStyle={styles.formInputLabelContainer}
        label={MESSAGES.ADDRESS}
        containerStyle={styles.formInputContainer}
        multiline
        style={styles.address}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: Layout.spacingHorizontal,
    paddingBottom: 0,
  },
  formInputContainer: {
    marginBottom: Layout.spacingHorizontal,
  },
  formInputLabelContainer: {
    width: 120,
  },
  address: {
    height: 70,
    textAlignVertical: 'top',
  },
});
