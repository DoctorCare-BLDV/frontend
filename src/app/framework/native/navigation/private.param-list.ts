import {SectionListProps, ListRenderItem} from 'react-native';
import {RowItemData} from '../components';
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
  FilterModal: FilterModalProps;
  ProductDetail: undefined;
  EditProfile: undefined;
  ChangePassword: undefined;
};
