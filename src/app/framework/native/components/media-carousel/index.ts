import {
  AdditionalParallaxProps,
  CarouselProps,
} from 'react-native-snap-carousel';

export * from './MediaCarousel';

export type MediaCarouselItem = {
  url: string;
};

export interface MediaCarouselProps
  extends Omit<CarouselProps<MediaCarouselItem>, 'renderItem'> {
  renderItem?(
    item: {item: MediaCarouselItem; index: number},
    parallaxProps?: AdditionalParallaxProps,
  ): React.ReactNode;
}
