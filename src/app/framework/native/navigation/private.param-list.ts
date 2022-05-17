import {SectionListProps, ListRenderItem} from 'react-native';
import {RowItemData} from '../components';
import {ConfirmationModalProps} from '../components/confirmation-modal';
import {FilterModalData} from '../containers';

export interface FilterModalProps
  extends Omit<SectionListProps<RowItemData>, 'renderItem' | 'sections'> {
  headerTitle?: string;
  cancelTitle?: string;
  confirmTitle?: string;

  data?: FilterModalData[];
  selectedData?: RowItemData[];

  searchValue?: string;

  onFinishSelectOptions?: (options: RowItemData[]) => void;

  searchable?: boolean;

  renderItem?: ListRenderItem<RowItemData> | null | undefined;
}

export type PrivateParamList = {
  BottomTab: undefined;
  ProductDetail: undefined;
  Cart: undefined;
  OrderConfirmation: undefined;
  FilterModal: FilterModalProps;
  ConfirmationModal: ConfirmationModalProps;
  EditProfile: undefined;
  ChangePassword: undefined;
};
