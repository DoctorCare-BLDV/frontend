import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {
  Animated,
  Keyboard,
  SectionList,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import {getBottomSpace} from 'react-native-iphone-x-helper';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import ReactNativeModal from 'react-native-modal';
import {Header} from '@react-navigation/stack';

import {AppDimensions, Layout} from '@app/resources';
import {
  FullScreenLoadingIndicator,
  HeaderButton,
  HeaderButtonType,
  SearchBar,
  RowItem,
  TextView,
  RowItemData,
} from '@native/components';

import {FilterModalProps} from './types';
import {useTheme} from '@app/shared/hooks/useTheme';

export type FilterModalData = {
  title?: string;
  data?: RowItemData[];
};

const MESSAGES = {
  HEADER_CANCEL: 'Huỷ',
  HEADER_DONE: 'Xong',
  HEADER_SEARCH: 'Tìm kiếm danh mục',
  NO_OPTIONS: 'Chưa có dữ liệu!',
};

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    justifyContent: 'flex-end',
    margin: 0,
  },
  container: {
    minHeight: AppDimensions.height * 0.4,
    maxHeight: AppDimensions.height * 0.8,
    overflow: 'hidden',
    borderTopLeftRadius: Layout.spacingHorizontal,
    borderTopRightRadius: Layout.spacingHorizontal,
  },
  headerSearchContainer: {
    margin: Layout.spacingHorizontal,
  },
  listContentContainer: {
    paddingBottom: getBottomSpace(),
    flexGrow: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: '50%',
  },
  emptyIcon: {
    fontSize: 32,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: Layout.spacingHorizontal,
  },

  loadingContainer: {
    top: 60,
  },

  title: {
    padding: Layout.spacingHorizontal,
    paddingBottom: Layout.spacingHorizontal / 2,
    fontWeight: 'bold',
  },
});

const _FilterModal: React.FC<FilterModalProps> = ({
  route,
  navigation,
}: FilterModalProps) => {
  const theme = useTheme();

  const {
    searchValue: searchValueProp,
    searchable,
    confirmTitle = MESSAGES.HEADER_DONE,
    cancelTitle = MESSAGES.HEADER_CANCEL,
    // @ts-ignore
    categoryCode,
    ...params
  } = route.params;

  const isUseDataServer = useMemo(() => {
    return !!categoryCode;
  }, [categoryCode]);

  const [listOptions, setListOptions] = useState<FilterModalData[]>(
    params.data || [],
  );
  const [listSelectedOptions, setListSelectedOptions] = useState<RowItemData[]>(
    params.selectedData || [],
  );

  const [isLoading] = useState(isUseDataServer);
  const [visible, setVisible] = useState(false);
  const [listSearchedOptions, setListSearchedOptions] = useState<
    FilterModalData[]
  >([]);
  const [searchValue, setSearchValue] = useState(searchValueProp || '');

  useEffect(() => {
    setTimeout(() => setVisible(true), 200);
  }, []);

  useEffect(() => {
    setListOptions(
      isUseDataServer
        ? []
        : params?.data?.map((option: FilterModalData) => {
            const cloneOption: FilterModalData = {
              ...option,
              data: option?.data?.map((item: RowItemData) => {
                return {
                  ...item,
                  checked: !!params.selectedData?.find(
                    opt => opt.id === item.id,
                  ),
                };
              }),
            };
            return cloneOption;
          }) || [],
    );
  }, [params?.data, isUseDataServer, params.selectedData]);

  useEffect(() => {
    if (!isUseDataServer) {
      return;
    }
  }, [isUseDataServer]);

  useEffect(() => {
    const listFilteredOptions = searchValue
      ? [...listOptions].map((option: FilterModalData) => ({
          ...option,
          data: option?.data?.length
            ? option.data.filter(
                (item: RowItemData) =>
                  item.label &&
                  item.label.toLowerCase().includes(searchValue.toLowerCase()),
              )
            : [],
        }))
      : [];

    setListSearchedOptions(listFilteredOptions);
  }, [searchValue, listOptions]);

  const containerBaseStyle = useMemo(() => {
    return [
      styles.container,
      {
        backgroundColor: theme.colorScheme.surface,
      },
      route.params.containerStyle,
    ];
  }, [theme, route.params.containerStyle]);

  const emptyIconStyle = useMemo(() => {
    return [
      styles.emptyIcon,
      {
        color: theme.textColorScheme.secondary,
      },
    ];
  }, [theme]);

  const emptyTitleStyle = useMemo(() => {
    return [
      styles.emptyTitle,
      {
        color: theme.textColorScheme.secondary,
      },
    ];
  }, [theme]);

  const titleStyle = useMemo(() => {
    return [
      styles.title,
      {
        color: theme.colorScheme.primary,
      },
    ];
  }, [theme]);

  const handlePressOption = useCallback(
    (id: string | number) => {
      const sections: FilterModalData[] = [...listOptions];

      let pressedOption: RowItemData | null = null;
      sections.forEach(options => {
        if (!options.data) {
          return;
        }
        options.data.some(option => {
          if (option.id === id) {
            option.checked = !option.checked;
            pressedOption = option;
          }

          return option.id === id;
        });
      });

      setListOptions(sections);
      setListSelectedOptions(previousListSelectedOptions => {
        const oldListSelectedOptions = [...previousListSelectedOptions];
        const optionIndex = oldListSelectedOptions.findIndex(
          option => option.id === id,
        );

        if (optionIndex !== -1) {
          oldListSelectedOptions.splice(optionIndex, 1);
        } else if (pressedOption) {
          oldListSelectedOptions.push(pressedOption);
        }

        return oldListSelectedOptions;
      });
    },
    [listOptions],
  );

  const handleChangeSearchValue = useCallback(value => {
    setSearchValue(value);
  }, []);

  const hideModal = useCallback(() => {
    setVisible(false);
  }, []);

  const goBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const renderHeaderLeft = useCallback(() => {
    return (
      <HeaderButton
        type={HeaderButtonType.SECONDARY}
        label={cancelTitle}
        onPress={hideModal}
      />
    );
  }, [cancelTitle, hideModal]);

  const renderHeaderRight = useCallback(() => {
    return (
      <HeaderButton
        label={confirmTitle}
        onPress={() => {
          route.params.onFinishSelectOptions &&
            route.params.onFinishSelectOptions(listSelectedOptions);
          hideModal();
        }}
      />
    );
  }, [confirmTitle, listSelectedOptions, hideModal, route.params]);

  const renderHeader = useCallback(() => {
    return (
      <View>
        <Header
          styleInterpolator={() => ({})}
          layout={{
            width: AppDimensions.width,
            height: 0,
          }}
          progress={{
            current: new Animated.Value(1),
          }}
          options={{
            headerTitle: route.params.title || 'Bộ lọc',
            headerTitleAlign: 'center',
            headerStatusBarHeight: 0,
            headerStyle: {
              height: 54,
              borderBottomWidth: 1,
            },
            headerLeft: renderHeaderLeft,
            headerRight: renderHeaderRight,
          }}
          route={route}
          navigation={navigation}
        />
      </View>
    );
  }, [route, navigation, renderHeaderLeft, renderHeaderRight]);

  const renderSectionHeader = ({section}: {section: any}) => {
    if (!section.title) return null;
    return <TextView style={titleStyle}>{section.title}</TextView>;
  };

  const renderOption = ({item}: {item: RowItemData}) => {
    return (
      <RowItem
        label={item.label}
        type={item.type}
        checked={item.checked}
        onPress={() => handlePressOption(item.id)}
      />
    );
  };

  const renderListEmpty = useCallback(() => {
    return !isLoading ? (
      <View style={styles.emptyContainer}>
        <FontAwesome5Icon name="exclamation" style={emptyIconStyle} />
        <TextView style={emptyTitleStyle}>{MESSAGES.NO_OPTIONS}</TextView>
      </View>
    ) : null;
  }, [isLoading, emptyIconStyle, emptyTitleStyle]);

  return (
    <ReactNativeModal
      isVisible={visible}
      onBackdropPress={hideModal}
      onModalHide={goBack}
      useNativeDriver
      useNativeDriverForBackdrop
      hideModalContentWhileAnimating
      avoidKeyboard
      propagateSwipe
      style={styles.modal}>
      <View style={containerBaseStyle}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View>
            {renderHeader()}
            {!!searchable && (
              <SearchBar
                containerStyle={styles.headerSearchContainer}
                value={searchValue}
                placeholder={MESSAGES.HEADER_SEARCH}
                onChangeText={handleChangeSearchValue}
              />
            )}
          </View>
        </TouchableWithoutFeedback>

        <FullScreenLoadingIndicator
          containerStyle={styles.loadingContainer}
          useModal={false}
          visible={isLoading}
        />
        <SectionList
          keyExtractor={item => item.id.toString()}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="interactive"
          extraData={searchValue}
          ListEmptyComponent={renderListEmpty}
          stickySectionHeadersEnabled={false}
          {...params}
          contentContainerStyle={[
            styles.listContentContainer,
            params.contentContainerStyle,
          ]}
          //@ts-ignore
          sections={searchValue ? listSearchedOptions : listOptions}
          renderItem={params.renderItem || renderOption}
          renderSectionHeader={
            params.renderSectionHeader || renderSectionHeader
          }
        />
      </View>
    </ReactNativeModal>
  );
};

export const FilterModal = React.memo(_FilterModal);
