import React, {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  FlatList,
  StyleProp,
  StyleSheet,
  TouchableHighlight,
  View,
  ViewStyle,
} from 'react-native';

import ReactNativeModal from 'react-native-modal';

import {TextView} from '@native/components';
import {AppDimensions, Layout} from '@app/resources';
import {useTheme, useAddress} from '@app/shared/hooks';
import {AddressType, IAddress} from '@data/models';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {HeaderButton, HeaderButtonType} from '../header-button';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {FullScreenLoadingIndicator} from '../indicator';

export interface AddressPickerProps {
  visible?: boolean;
  selectedId?: number;
  type?: AddressType;
  provinceName?: string;
  districtName?: string;
  wardName?: string;
  containerStyle?: StyleProp<ViewStyle>;

  onSelect?: (address: IAddress, type: AddressType) => void;
  onCancel?: () => void;
  onConfirm?: (data: {
    provinceName?: string;
    districtName?: string;
    wardName?: string;
  }) => void;
  onModalHide?: () => void;
}

const MESSAGES = {
  CANCEL: 'Huỷ',
  CONFIRM: 'Xong',
  CONTINUE: 'Tiếp tục',
  SELECT_PROVINCE: 'Chọn Tỉnh/ Thành phố',
  SELECT_DISTRICT: 'Chọn Quận/ Huyện',
  SELECT_WARD: 'Chọn Phường/ Xã',
  NO_RESULT: 'Không có dữ liệu',
};

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    justifyContent: 'flex-end',
    margin: 0,
  },
  container: {
    paddingBottom: 0,
    height: AppDimensions.height * 0.8,
    overflow: 'hidden',
    borderTopLeftRadius: Layout.spacingHorizontal,
    borderTopRightRadius: Layout.spacingHorizontal,
  },
  contentContainer: {
    flexGrow: 1,
  },
  headerContainer: {
    paddingVertical: Layout.spacingHorizontal,
    borderBottomWidth: 1,
  },
  headerMainContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerLeftContainer: {},
  headerTitleContainer: {
    zIndex: -1,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    ...StyleSheet.absoluteFillObject,
    paddingHorizontal: 40,
  },
  headerTitle: {
    fontSize: 18,
  },
  subTitle: {
    marginTop: 10,
    paddingHorizontal: Layout.spacingHorizontal,
    textAlign: 'center',
  },
  headerRightContainer: {},
  addressContainer: {
    flexDirection: 'row',
    padding: Layout.spacingHorizontal,
    paddingVertical: Layout.spacingVertical,
    borderBottomWidth: 0.5,
  },
  addressTitle: {
    flex: 1,
  },
  backIcon: {
    fontSize: 24,
    height: 20,
  },
  icon: {},
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyIcon: {
    fontSize: 40,
  },
  emptyTitle: {
    marginTop: Layout.spacingVertical,
  },
});

const _AddressPicker = ({
  visible,
  containerStyle,
  type: typeProps,
  provinceName,
  districtName,
  wardName,

  onSelect = () => {},
  onCancel = () => {},
  onConfirm = () => {},
  onModalHide = () => {},
}: AddressPickerProps) => {
  const theme = useTheme();
  const {getAddressList} = useAddress();
  const {bottom} = useSafeAreaInsets();
  const [provinceList, setProvinceList] = useState<IAddress[]>([]);
  const [districtList, setDistrictList] = useState<IAddress[]>([]);
  const [wardList, setWardList] = useState<IAddress[]>([]);

  const hasProvinceList = useRef(!!provinceList.length);
  const hasDistrictList = useRef(!!districtList.length);
  const hasWardList = useRef(!!wardList.length);

  // const [addressList, setAddressList] = useState<IAddress[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [selectedProvince, setSelectedProvince] = useState({
    name: provinceName,
  });
  const [selectedDistrict, setSelectedDistrict] = useState({
    name: districtName,
  });
  const [selectedWard, setSelectedWard] = useState({name: wardName});

  const [type, setType] = useState(typeProps);

  useEffect(() => {
    setType(typeProps);
  }, [typeProps, visible]);

  useEffect(() => {
    setSelectedProvince({name: provinceName});
  }, [provinceName, visible]);

  useEffect(() => {
    setSelectedDistrict({name: districtName});
  }, [districtName, visible]);

  useEffect(() => {
    setSelectedWard({name: wardName});
  }, [wardName, visible]);

  useEffect(() => {
    hasProvinceList.current = !!provinceList.length;
  }, [provinceList]);
  useEffect(() => {
    hasDistrictList.current = !!districtList.length;
  }, [districtList]);
  useEffect(() => {
    hasWardList.current = !!wardList.length;
  }, [wardList]);

  const containerBaseStyle = useMemo(() => {
    return [
      styles.container,
      {
        backgroundColor: theme.colorScheme.surface,
      },
      containerStyle,
    ];
  }, [containerStyle, theme]);

  const contentContainerBaseStyle = useMemo(() => {
    return [
      styles.contentContainer,
      {
        paddingBottom: bottom,
      },
    ];
  }, [bottom]);

  const headerContainerBaseStyle = useMemo(() => {
    return [styles.headerContainer, {borderColor: theme.colorScheme.border}];
  }, [theme]);

  const addressContainerBaseStyle = useMemo(() => {
    return [
      styles.addressContainer,
      {
        borderColor: theme.colorScheme.border,
      },
    ];
  }, [theme]);

  const backIconStyle = useMemo(() => {
    return [
      styles.backIcon,
      {
        color: theme.colorScheme.inactive,
      },
    ];
  }, [theme]);

  const iconBaseStyle = useMemo(() => {
    return [styles.icon, {color: theme.colorScheme.primary}];
  }, [theme]);

  const title = useMemo(() => {
    switch (type) {
      case AddressType.PROVINCE:
        return MESSAGES.SELECT_PROVINCE;
      case AddressType.DISTRICT:
        return MESSAGES.SELECT_DISTRICT;
      case AddressType.WARD:
        return MESSAGES.SELECT_WARD;
    }
  }, [type]);

  const emptyIconStyle = useMemo(() => {
    return [
      styles.emptyIcon,
      {
        color: theme.colorScheme.inactive,
      },
    ];
  }, [theme]);

  const emptyTitleStyle = useMemo(() => {
    return [
      styles.emptyTitle,
      {
        color: theme.colorScheme.inactive,
      },
    ];
  }, [theme]);

  const subTitle = useMemo(() => {
    return (
      (selectedProvince.name || '') +
      (selectedDistrict.name ? ' - ' + selectedDistrict.name : '') +
      (selectedWard.name ? ' - ' + selectedWard.name : '')
    );
  }, [selectedProvince, selectedDistrict, selectedWard]);

  const handleGetAddressList = useCallback(
    async (
      aType = type,
      pName = selectedProvince.name,
      dName = selectedDistrict.name,
    ) => {
      if (!aType) {
        return;
      }
      switch (aType) {
        case AddressType.PROVINCE:
          if (provinceList.length) {
            return;
          }
          break;
        case AddressType.DISTRICT:
          if (districtList.length) {
            return;
          }
          break;
        case AddressType.WARD:
          if (wardList.length) {
            return;
          }
          break;
      }
      setLoading(true);
      const data = {
        type: aType,
        provinceName: pName,
        districtName: dName,
      };
      const res = await getAddressList({data});
      // console.log(data, res, selectedProvince);
      // setAddressList(res || []);
      switch (type) {
        case AddressType.PROVINCE:
          setProvinceList(res || []);
          break;
        case AddressType.DISTRICT:
          setDistrictList(res || []);
          break;
        case AddressType.WARD:
          setWardList(res || []);
          break;
      }
      setLoading(false);
    },
    [
      getAddressList,
      type,
      selectedProvince,
      selectedDistrict,
      provinceList,
      districtList,
      wardList,
    ],
  );

  useEffect(() => {
    if (visible) {
      handleGetAddressList();
    } else {
      setLoading(false);
    }
  }, [visible, handleGetAddressList]);

  const handleConfirm = useCallback(
    (
      province = selectedProvince,
      district = selectedDistrict,
      ward = selectedWard,
    ) => {
      onConfirm({
        provinceName: province.name,
        districtName: district.name,
        wardName: ward.name,
      });
    },
    [onConfirm, selectedProvince, selectedDistrict, selectedWard],
  );

  const handleSelect = useCallback(
    (address, addressType) => {
      onSelect(address, addressType);
      setLoading(true);
      switch (addressType) {
        case AddressType.PROVINCE:
          setSelectedProvince(address);
          setType(AddressType.DISTRICT);
          setSelectedDistrict({name: ''});
          setSelectedWard({name: ''});
          setDistrictList([]);
          break;
        case AddressType.DISTRICT:
          setSelectedDistrict(address);
          setWardList([]);
          setSelectedWard({name: ''});
          setType(AddressType.WARD);
          break;
        case AddressType.WARD:
          setSelectedWard(address);
          handleConfirm(undefined, undefined, address);
          break;
      }
    },
    [handleConfirm, onSelect],
  );

  const handleCancel = useCallback(() => {
    switch (type) {
      case AddressType.PROVINCE:
        onCancel();
        break;
      case AddressType.DISTRICT:
        setType(AddressType.PROVINCE);
        setSelectedDistrict({name: ''});
        setSelectedWard({name: ''});
        break;
      case AddressType.WARD:
        setType(AddressType.DISTRICT);
        setSelectedWard({name: ''});
        break;
    }
  }, [onCancel, type]);

  const renderAddress = useCallback(
    ({item: address}: {item: IAddress}) => {
      const isSelected =
        address.name ===
        (type === AddressType.PROVINCE
          ? provinceName
          : type === AddressType.DISTRICT
          ? districtName
          : type === AddressType.WARD
          ? wardName
          : -1);
      return (
        <TouchableHighlight
          underlayColor={theme.colorScheme.underlay}
          onPress={() => handleSelect(address, type)}>
          <View style={addressContainerBaseStyle}>
            <TextView style={styles.addressTitle}>{address.name}</TextView>
            {isSelected && (
              <FontAwesome5Icon name="check" style={iconBaseStyle} />
            )}
          </View>
        </TouchableHighlight>
      );
    },
    [
      handleSelect,
      type,
      addressContainerBaseStyle,
      theme,
      iconBaseStyle,
      provinceName,
      districtName,
      wardName,
    ],
  );

  const data = useMemo(() => {
    switch (type) {
      case AddressType.PROVINCE:
        return provinceList;
      case AddressType.DISTRICT:
        return districtList;
      case AddressType.WARD:
        return wardList;
    }
  }, [type, provinceList, districtList, wardList]);

  const EmptyComponent = useMemo(() => {
    if (isLoading || type === undefined) {
      return null;
    }

    return (
      <View style={styles.emptyContainer}>
        <FontAwesome5Icon name="exclamation-circle" style={emptyIconStyle} />
        <TextView style={emptyTitleStyle}>{MESSAGES.NO_RESULT}</TextView>
      </View>
    );
  }, [isLoading, emptyIconStyle, emptyTitleStyle, type]);

  return (
    <ReactNativeModal
      isVisible={visible}
      onBackdropPress={onCancel}
      backdropOpacity={0.6}
      style={styles.modal}
      useNativeDriver
      useNativeDriverForBackdrop
      hideModalContentWhileAnimating
      propagateSwipe
      onModalHide={onModalHide}>
      <View style={containerBaseStyle}>
        <View style={headerContainerBaseStyle}>
          <View style={styles.headerMainContainer}>
            <View style={styles.headerLeftContainer}>
              <HeaderButton
                type={HeaderButtonType.SECONDARY}
                label={MESSAGES.CANCEL}
                onPress={handleCancel}>
                {type !== AddressType.PROVINCE && (
                  <FontAwesome5Icon name="angle-left" style={backIconStyle} />
                )}
              </HeaderButton>
            </View>
            <View style={styles.headerTitleContainer}>
              <TextView style={styles.headerTitle}>{title}</TextView>
            </View>
            {/* <View style={styles.headerRightContainer}>
              {type === AddressType.WARD && (
                <HeaderButton
                  type={HeaderButtonType.PRIMARY}
                  label={MESSAGES.CONFIRM}
                  onPress={() => handleConfirm()}
                />
              )}
            </View> */}
          </View>
          {!!subTitle && (
            <TextView
              style={[
                styles.subTitle,
                {color: theme.textColorScheme.secondary},
              ]}>
              {subTitle}
            </TextView>
          )}
        </View>

        <FlatList
          data={data}
          renderItem={renderAddress}
          contentContainerStyle={contentContainerBaseStyle}
          keyExtractor={(_, index) => String(index)}
          ListEmptyComponent={EmptyComponent}
        />
        <FullScreenLoadingIndicator visible={isLoading} useModal={false} />
      </View>
    </ReactNativeModal>
  );
};

export const AddressPicker = memo(_AddressPicker);
