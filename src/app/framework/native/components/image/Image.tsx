import React, {memo, useCallback, useMemo, useState} from 'react';
import {StyleSheet} from 'react-native';

import FastImage, {FastImageProps, Source} from 'react-native-fast-image';

import {useTheme} from '@app/shared/hooks/useTheme';

export interface ImageProps extends FastImageProps {
  ref?: any;
  source: Source | {uri: string};
}

const styles = StyleSheet.create({
  error: {},
});

const _Image = React.forwardRef(({style, ...props}: ImageProps, ref: any) => {
  const theme = useTheme();

  const [isError, setError] = useState(!props.source?.uri || !props.source);

  const handleLoad = useCallback(() => {
    setError(false);
  }, []);

  const handleError = useCallback(() => {
    setError(true);
  }, []);

  const imageStyle = useMemo(() => {
    return [
      isError && [
        styles.error,
        {
          backgroundColor: theme.colorScheme.underlay,
        },
      ],
      style,
    ];
  }, [style, isError, theme]);

  return (
    <FastImage
      onLoad={handleLoad}
      onError={handleError}
      ref={ref}
      {...props}
      style={imageStyle}
    />
  );
});

export const Image = memo(_Image);
