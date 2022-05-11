import {Colors, Layout} from '@app/resources';
import {useTheme} from '@app/shared/hooks/useTheme';
import React, {useCallback, useMemo} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  StyleProp,
  TextStyle,
  ViewStyle,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {TextView} from '../label';

export enum FooterActionBarType {
  PRIMARY = 0,
  WARNING = 1,
  SUCCESS = 2,
}

export interface FooterActionBarProps {
  labelBlockRef?: any;
  type?: FooterActionBarType;
  safeLayout?: boolean;
  iconLeftName?: string;
  iconLeftStyle?: StyleProp<TextStyle>;
  label?: string;
  labelContainerStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  value?: string;
  valueContainerStyle?: StyleProp<ViewStyle>;
  valueStyle?: StyleProp<TextStyle>;
  btnTitle?: string;
  btnContainerStyle?: StyleProp<ViewStyle>;
  btnTitleStyle?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  onLabelPress?: () => void;
  onBtnPress?: () => void;
}

export const FooterActionBar: React.FC<FooterActionBarProps> = ({
  labelBlockRef,
  type = FooterActionBarType.PRIMARY,
  iconLeftName,
  iconLeftStyle,
  label,
  labelContainerStyle,
  labelStyle,
  value,
  valueContainerStyle,
  valueStyle,
  btnTitle,
  btnContainerStyle,
  btnTitleStyle,
  safeLayout,
  containerStyle,
  onLabelPress,
  onBtnPress,
}) => {
  const theme = useTheme();

  const {bottom} = useSafeAreaInsets();

  const containerBaseStyle = useMemo(() => {
    return [
      styles.container,
      safeLayout && {
        paddingBottom: bottom,
      },
      containerStyle,
    ];
  }, [bottom, safeLayout, containerStyle]);

  const textStyle = useMemo(() => {
    return {
      color: theme.colorScheme.primary,
    };
  }, [theme]);

  const iconStyle = useMemo(() => {
    return [styles.icon, textStyle, iconLeftStyle];
  }, [textStyle, iconLeftStyle]);

  const labelContainerBaseStyle = useMemo(() => {
    return [styles.labelContainer, labelContainerStyle];
  }, [labelContainerStyle]);

  const labelBaseStyle = useMemo(() => {
    return [styles.label, textStyle, labelStyle];
  }, [textStyle, labelStyle]);

  const valueContainerBaseStyle = useMemo(() => {
    return [styles.valueContainer, valueContainerStyle];
  }, [valueContainerStyle]);

  const valueBaseStyle = useMemo(() => {
    return [styles.value, textStyle, valueStyle];
  }, [textStyle, valueStyle]);

  const btnContainerBaseStyle = useMemo(() => {
    let style: StyleProp<ViewStyle> = {
      backgroundColor: theme.colorScheme.primary,
    };

    switch (type) {
      case FooterActionBarType.SUCCESS:
        style = {
          ...style,
          backgroundColor: Colors.SUCCESS,
        };
        break;
      case FooterActionBarType.WARNING:
        style = {
          ...style,
          backgroundColor: Colors.WARNING,
        };
        break;
    }

    return [styles.btnContainer, style, btnContainerStyle];
  }, [btnContainerStyle, theme, type]);

  const btnTitleBaseStyle = useMemo(() => {
    return [styles.btnTitle, btnTitleStyle];
  }, [btnTitleStyle]);

  const renderLabelBlock = useCallback(() => {
    if (!iconLeftName && !label) {
      return null;
    }

    return (
      <TouchableOpacity
        ref={labelBlockRef}
        style={labelContainerBaseStyle}
        disabled={!onLabelPress}
        onPress={onLabelPress}>
        {!!iconLeftName && (
          <FontAwesome5Icon solid name={iconLeftName} style={iconStyle} />
        )}
        {!!label && <TextView style={labelBaseStyle}>{label}</TextView>}
      </TouchableOpacity>
    );
  }, [
    labelBlockRef,
    iconLeftName,
    label,
    onLabelPress,
    labelContainerBaseStyle,
    iconStyle,
    labelBaseStyle,
  ]);

  const renderValueBlock = useCallback(() => {
    if (!value) {
      return null;
    }

    return (
      <View style={valueContainerBaseStyle}>
        <TextView style={valueBaseStyle}>{value}</TextView>
      </View>
    );
  }, [valueBaseStyle, value, valueContainerBaseStyle]);

  return (
    <View style={containerBaseStyle}>
      {renderLabelBlock()}

      {renderValueBlock()}

      <TouchableOpacity
        activeOpacity={0.6}
        style={btnContainerBaseStyle}
        onPress={onBtnPress}>
        <TextView style={btnTitleBaseStyle}>{btnTitle}</TextView>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F4F4F4',

    shadowColor: Colors.BLACK,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.18,
    shadowRadius: 5,

    elevation: 5,
  },
  infoContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    height: '100%',
  },
  icon: {
    fontSize: 20,
    marginRight: 5,
  },
  labelContainer: {
    flex: 1,
    paddingHorizontal: Layout.spacingHorizontal,
    flexDirection: 'row',
    alignItems: 'center',
    height: '100%',
  },
  label: {
    fontWeight: '500',
    fontSize: 13,
  },
  valueContainer: {
    paddingHorizontal: Layout.spacingHorizontal,
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
  value: {
    fontWeight: '500',
    alignSelf: 'center',
  },

  btnContainer: {
    padding: Layout.spacingHorizontal,
  },
  btnTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.WHITE,
  },
});
