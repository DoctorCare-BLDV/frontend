import React, {useCallback, useState} from 'react';
import {View, StyleSheet} from 'react-native';

import {AddressPicker, FormInput} from '@app/framework/native/components';
import {Layout} from '@app/resources';
import {AddressType} from '@data/models';

export interface CustomerInformationProps {}

const MESSAGES = {
  CUSTOMER_NAME: 'Tên khách hàng',
  PHONE_NUMBER: 'Số điện thoại',
  PROVINCE: 'Tỉnh/ Thành phố',
  DISTRICT: 'Quận/ Huyện',
  WARD: 'Phường/ Xã',
  ADDRESS: 'Địa chỉ chi tiết',
};

export const CustomerInformation: React.FC<
  CustomerInformationProps
> = props => {
  const {} = props;
  const [selectedProvince, setProvince] = useState();
  const [selectedDistrict, setDistrict] = useState();
  const [selectedWard, setWard] = useState();
  const [addressPickerType, setAddressPickerType] = useState<
    AddressType | undefined
  >();

  const handlePressProvince = useCallback(() => {
    setAddressPickerType(AddressType.PROVINCE);
  }, []);

  const handlePressDistrict = useCallback(() => {
    setAddressPickerType(AddressType.DISTRICT);
  }, []);

  const handlePressWard = useCallback(() => {
    setAddressPickerType(AddressType.WARD);
  }, []);

  const handleConfirmAddress = useCallback(
    ({provinceName, districtName, wardName}) => {
      setProvince(provinceName);
      setDistrict(districtName);
      setWard(wardName);
      setAddressPickerType(undefined);
    },
    [],
  );

  const handleModalHide = useCallback(() => {
    setAddressPickerType(undefined);
  }, []);

  const districtStyle = {
    opacity: selectedProvince ? 1 : 0.3,
  };

  const wardStyle = {
    opacity: selectedProvince && selectedDistrict ? 1 : 0.3,
  };

  return (
    <>
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
          label={MESSAGES.PROVINCE}
          value={selectedProvince}
          containerStyle={styles.formInputContainer}
          onPressInput={handlePressProvince}
        />
        <View
          pointerEvents={selectedProvince ? 'auto' : 'none'}
          style={districtStyle}>
          <FormInput
            labelContainerStyle={styles.formInputLabelContainer}
            label={MESSAGES.DISTRICT}
            value={selectedDistrict}
            containerStyle={styles.formInputContainer}
            onPressInput={handlePressDistrict}
          />
        </View>
        <View
          pointerEvents={selectedProvince ? 'auto' : 'none'}
          style={wardStyle}>
          <FormInput
            labelContainerStyle={styles.formInputLabelContainer}
            label={MESSAGES.WARD}
            value={selectedWard}
            containerStyle={styles.formInputContainer}
            onPressInput={handlePressWard}
          />
        </View>

        <FormInput
          labelContainerStyle={[
            styles.formInputLabelContainer,
            styles.formInputAddressLabelContainer,
          ]}
          label={MESSAGES.ADDRESS}
          containerStyle={styles.formInputContainer}
          multiline
          style={styles.address}
        />
      </View>
      <AddressPicker
        visible={addressPickerType !== undefined}
        type={addressPickerType}
        provinceName={selectedProvince}
        districtName={selectedDistrict}
        wardName={selectedWard}
        onModalHide={handleModalHide}
        onConfirm={handleConfirmAddress}
        onCancel={() => setAddressPickerType(undefined)}
      />
    </>
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
  formInputAddressLabelContainer: {
    alignSelf: 'flex-start',
  },
  address: {
    height: 70,
    textAlignVertical: 'top',
  },
});
