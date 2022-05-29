import React, {useCallback, useMemo, useState} from 'react';
import {View, StyleSheet} from 'react-native';

import {AddressPicker, FormInput} from '@app/framework/native/components';
import {Layout} from '@app/resources';
import {AddressType} from '@data/models';
import {useEffect} from 'react';

export interface CustomerInformationProps {
  name?: string;
  phone?: string;
  province?: string;
  district?: string;
  ward?: string;
  address?: string;
  onFormDataChange?: (data: {
    name?: string;
    phone?: string;
    province?: string;
    district?: string;
    ward?: string;
    address?: string;
  }) => void;
}

const MESSAGES = {
  CUSTOMER_NAME: 'Tên khách hàng',
  PHONE_NUMBER: 'Số điện thoại',
  PROVINCE: 'Tỉnh/ Thành phố',
  DISTRICT: 'Quận/ Huyện',
  WARD: 'Phường/ Xã',
  ADDRESS: 'Địa chỉ chi tiết',
};

export const CustomerInformation: React.FC<CustomerInformationProps> = ({
  name: nameProp,
  phone: phoneProp,
  province: provinceProp,
  district: districtProp,
  ward: wardProp,
  address: addressProp,
  onFormDataChange = () => {},
}) => {
  const [name, setName] = useState<string | undefined>();
  const [phone, setPhone] = useState<string | undefined>();
  const [selectedProvince, setProvince] = useState<string | undefined>();
  const [selectedDistrict, setDistrict] = useState<string | undefined>();
  const [selectedWard, setWard] = useState<string | undefined>();
  const [address, setAddress] = useState<string | undefined>();
  const [addressPickerType, setAddressPickerType] = useState<
    AddressType | undefined
  >();

  useEffect(() => {
    setName(nameProp || '');
  }, [nameProp]);
  useEffect(() => {
    setPhone(phoneProp || '');
  }, [phoneProp]);
  useEffect(() => {
    setProvince(provinceProp || '');
  }, [provinceProp]);
  useEffect(() => {
    setDistrict(districtProp || '');
  }, [districtProp]);
  useEffect(() => {
    setWard(wardProp || '');
  }, [wardProp]);
  useEffect(() => {
    setAddress(addressProp || '');
  }, [addressProp]);

  useEffect(() => {
    onFormDataChange({
      name,
      phone,
      province: selectedProvince,
      district: selectedDistrict,
      ward: selectedWard,
      address,
    });
  }, [
    onFormDataChange,
    name,
    phone,
    selectedProvince,
    selectedDistrict,
    selectedWard,
    address,
  ]);

  const handlePressProvince = useCallback(() => {
    setAddressPickerType(AddressType.PROVINCE);
  }, []);

  const handlePressDistrict = useCallback(() => {
    setAddressPickerType(AddressType.DISTRICT);
  }, []);

  const handlePressWard = useCallback(() => {
    setAddressPickerType(AddressType.WARD);
  }, []);

  const handleChangeName = useCallback(text => {
    setName(text);
  }, []);

  const handleChangePhone = useCallback(text => {
    setPhone(text);
  }, []);

  const handleChangeAddress = useCallback(text => {
    setAddress(text);
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

  const districtInputContainerStyle = useMemo(() => {
    return [
      styles.formInputAddressLabelContainer,
      {
        opacity: selectedProvince ? 1 : 0.3,
      },
    ];
  }, [selectedProvince]);

  const wardInputContainerStyle = useMemo(() => {
    return [
      styles.formInputAddressLabelContainer,
      {
        opacity: selectedProvince && selectedDistrict ? 1 : 0.3,
      },
    ];
  }, [selectedProvince, selectedDistrict]);

  return (
    <>
      <View style={styles.container}>
        <FormInput
          labelContainerStyle={styles.formInputLabelContainer}
          label={MESSAGES.CUSTOMER_NAME}
          containerStyle={styles.formInputContainer}
          onChangeText={handleChangeName}
        />
        <FormInput
          labelContainerStyle={styles.formInputLabelContainer}
          label={MESSAGES.PHONE_NUMBER}
          containerStyle={styles.formInputContainer}
          onChangeText={handleChangePhone}
          keyboardType="phone-pad"
        />
        <FormInput
          labelContainerStyle={styles.formInputLabelContainer}
          label={MESSAGES.PROVINCE}
          value={selectedProvince}
          containerStyle={styles.formInputContainer}
          onPressInput={handlePressProvince}
        />
        <View pointerEvents={selectedProvince ? 'auto' : 'none'}>
          <FormInput
            inputWrapperStyle={districtInputContainerStyle}
            labelContainerStyle={styles.formInputLabelContainer}
            label={MESSAGES.DISTRICT}
            value={selectedDistrict}
            containerStyle={styles.formInputContainer}
            onPressInput={handlePressDistrict}
          />
        </View>
        <View
          pointerEvents={
            selectedProvince && selectedDistrict ? 'auto' : 'none'
          }>
          <FormInput
            inputWrapperStyle={wardInputContainerStyle}
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
          onChangeText={handleChangeAddress}
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
