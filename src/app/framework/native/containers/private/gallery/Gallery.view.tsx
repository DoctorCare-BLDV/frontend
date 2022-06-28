import React, {useCallback} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';

import {SafeAreaView} from 'react-native-safe-area-context';
import ImageViewer from 'react-native-image-zoom-viewer';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';

import {AppDimensions, Colors, Layout} from '@app/resources';
import {TextView} from '@native/components';

import {GalleryProps} from './types';

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.BLACK,
    width: AppDimensions.width,
    height: AppDimensions.height,
  },
  headerWrapper: {
    position: 'absolute',
    width: '100%',
    zIndex: 99,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Layout.spacingVertical,
  },
  indicatorLabel: {
    color: Colors.WHITE,
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
  },
  closeBtnContainer: {
    right: Layout.spacingHorizontal,
    position: 'absolute',
    zIndex: 1,
  },
  closeIcon: {
    fontSize: 22,
    color: Colors.WHITE,
  },
});

const _Gallery: React.FC<GalleryProps> = ({
  route,
  navigation,
}: GalleryProps) => {
  const closeModal = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const renderHeader = useCallback(
    (index: number | undefined) => {
      return (
        <View style={styles.headerWrapper}>
          <SafeAreaView>
            <View style={styles.headerContainer}>
              <TextView style={styles.indicatorLabel}>
                {(index || 0) + 1}/{route.params.imageUrls?.length}
              </TextView>
              <TouchableOpacity
                hitSlop={Layout.hitSlop}
                style={styles.closeBtnContainer}
                onPress={closeModal}>
                <AntDesignIcon name="close" style={styles.closeIcon} />
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </View>
      );
    },
    [route.params.imageUrls?.length, closeModal],
  );

  const renderIndicator = useCallback(() => {
    return <View />;
  }, []);

  return (
    <ImageViewer
      style={styles.container}
      imageUrls={route.params.imageUrls}
      index={route.params.index}
      enableSwipeDown
      swipeDownThreshold={100}
      saveToLocalByLongPress={false}
      enableImageZoom
      onSwipeDown={closeModal}
      renderHeader={renderHeader}
      renderIndicator={renderIndicator}
    />
  );
};

export const Gallery = React.memo(_Gallery);
