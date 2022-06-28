import React, {forwardRef, memo, useCallback, useMemo, useState} from 'react';
import {StyleSheet, TouchableWithoutFeedback, View} from 'react-native';

import Carousel from 'react-native-snap-carousel';
import {useNavigation} from '@react-navigation/native';
import {IImageInfo} from 'react-native-image-zoom-viewer/built/image-viewer.type';

import {hexToRgba} from '@app/utils';
import {Colors} from '@app/resources';

import {MediaCarouselItem, MediaCarouselProps} from '.';
import {GalleryNavigationProps} from '../../containers/private/gallery/types';
import {Image} from '../image';
import {TextView} from '../label';

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '100%',
  },
  paginationContainer: {
    position: 'absolute',
    bottom: 15,
    right: 15,
    backgroundColor: hexToRgba(Colors.WHITE, 0.7),
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 10,
  },
});

const _MediaCarousel: React.FC<MediaCarouselProps> = forwardRef<
  Carousel<MediaCarouselItem>,
  MediaCarouselProps
>(({data, renderItem, ...props}, ref) => {
  const galleryNavigation = useNavigation<GalleryNavigationProps>();
  const [selectedIndex, setSelectedIndex] = useState(props.firstItem || 0);

  const handlePressImage = useCallback(
    index => {
      galleryNavigation.navigate('Gallery', {
        imageUrls: data as IImageInfo[],
        index,
      });
    },
    [galleryNavigation, data],
  );

  const handleSnapToItem = useCallback(index => {
    setSelectedIndex(index);
  }, []);

  const pagination = useMemo(() => {
    if (data.length <= 1) {
      return null;
    }

    return (
      <View style={styles.paginationContainer}>
        <TextView>{selectedIndex + 1 + '/' + data.length}</TextView>
      </View>
    );
  }, [data.length, selectedIndex]);

  const renderCarouselItem = useCallback(
    ({item, index}: {item: MediaCarouselItem; index: number}) => {
      return (
        <TouchableWithoutFeedback onPress={() => handlePressImage(index)}>
          <Image
            source={{uri: item.url}}
            style={styles.image}
            resizeMode="contain"
          />
        </TouchableWithoutFeedback>
      );
    },
    [handlePressImage],
  );

  return (
    <View>
      <Carousel
        ref={ref}
        data={data}
        // @ts-ignore
        renderItem={renderItem || renderCarouselItem}
        bounces={data.length > 1}
        {...props}
        onSnapToItem={handleSnapToItem}
      />
      {pagination}
    </View>
  );
});

export const MediaCarousel = memo(_MediaCarousel);
