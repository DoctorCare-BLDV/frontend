import {ProductData} from '@data/models';
import {
  SectionListProps,
  ListRenderItem,
  StyleProp,
  ViewStyle,
} from 'react-native';
import {ImageViewerPropsDefine} from 'react-native-image-zoom-viewer';

import {RowItemData} from '../components';
import {ConfirmationModalProps} from '../components/confirmation-modal';
import {FilterModalData} from '../containers';

export interface FilterModalProps
  extends Omit<SectionListProps<RowItemData>, 'renderItem' | 'sections'> {
  title?: string;
  cancelTitle?: string;
  confirmTitle?: string;

  containerStyle?: StyleProp<ViewStyle>;

  data?: FilterModalData[];
  selectedData?: RowItemData[];

  searchValue?: string;

  onFinishSelectOptions?: (options: RowItemData[]) => void;

  searchable?: boolean;

  renderItem?: ListRenderItem<RowItemData> | null | undefined;
}

export interface ProductSearchProps {
  selectedFilters?: RowItemData[];
  searchValue?: string;
}

export interface ProductDetailProps {
  product: ProductData;
}

export interface GalleryProps extends ImageViewerPropsDefine {}

export type PrivateParamList = {
  BottomTab: undefined;
  ProductDetail: ProductDetailProps;
  Cart: undefined;
  OrderConfirmation: undefined;
  ProductSearch: ProductSearchProps;
  Notifications: undefined;
  NotificationDetail: {
    title: string;
    content: string;
    description: string;
    img?: any;
    createAt: number;
  };

  FilterModal: FilterModalProps;
  ConfirmationModal: ConfirmationModalProps;
  EditProfile: undefined;
  ChangePassword: undefined;
  Revenue: undefined;
  EditOrder: {id: number; refreshData: () => void};
  OrderDetail: {id: number};
  CustomersDetail: {id: number};
  Customer: undefined;
  Gallery: GalleryProps;
};
