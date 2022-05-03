import {AppDimensions, Layout} from '@app/resources';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
  },
  imageContainer: {
    width: AppDimensions.width,
    height: AppDimensions.width,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  overview: {
    padding: Layout.spacingHorizontal,
  },
  title: {
    fontSize: 16,
  },
  tagPriceContainer: {
    flexDirection: 'row',
    marginTop: 5,
  },
  tagContainer: {
    marginRight: 5,
  },
  tagLabel: {
    fontSize: 11,
  },
  priceWrapper: {
    paddingVertical: Layout.spacingHorizontal,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  price: {
    flex: 1,
    fontSize: 20,
    fontWeight: 'bold',
    marginRight: Layout.spacingHorizontal,
  },

  quantityContainer: {},

  block: {
    marginTop: Layout.spacingHorizontal,
  },
  blockTitle: {
    fontSize: 16,
  },
  blockContentText: {
    marginTop: Layout.spacingHorizontal,
  },
});
