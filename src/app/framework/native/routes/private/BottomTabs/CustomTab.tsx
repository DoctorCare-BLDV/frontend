import React, {useMemo} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';

import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
// import PushNotificationIOS from '@react-native-community/push-notification-ios';
// import PushNotification from 'react-native-push-notification';
import {Colors} from '@app/resources';
import {TextView} from '@native/components';
import {useTheme} from '@app/shared/hooks/useTheme';
// import {useUser} from '@hooks';
// import {FirebaseDataSource} from '@data';
import {useNotifications} from '@app/shared/contexts';

const TAB_BAR_ICON = [
  {
    bundle: FontAwesome5Icon,
    name: 'capsules',
  },
  {
    bundle: FontAwesome5Icon,
    name: 'box-open',
  },
  {
    bundle: FontAwesome5Icon,
    name: 'bell',
  },
  {
    bundle: FontAwesome5Icon,
    name: 'user-md',
  },
  // {
  //   bundle: FontAwesome5Icon,
  //   name: 'user-md',
  // },
];

const styles = StyleSheet.create({
  container: {
    height: 60,
    flexDirection: 'row',
    shadowColor: Colors.BLACK,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.1,
    shadowRadius: 10,

    elevation: 5,
  },
  btnContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  indicator: {
    width: '100%',
    height: 2,
    position: 'absolute',
    top: 0,
  },
  indicatorActive: {},
  labelActive: {},
  labelInactive: {},
  icon: {
    fontSize: 24,
    height: 26,
  },
  label: {
    fontSize: 10,
    marginTop: 3,
  },
  badgeContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    top: -6,
    right: -6,
    minWidth: 15,
    height: 15,
    borderRadius: 12,
    borderWidth: 0.5,
    paddingHorizontal: 2,
  },
});

const CustomTab = ({state, descriptors, navigation}: BottomTabBarProps) => {
  const {bottom} = useSafeAreaInsets();
  const theme = useTheme();
  const {totalUnread} = useNotifications();
  const containerStyle = useMemo(() => {
    return [
      styles.container,
      {
        height: 60 + bottom,
        paddingBottom: bottom,
        backgroundColor: theme.colorScheme.surface,
      },
    ];
  }, [bottom, theme]);

  const indicatorActiveStyle = useMemo(() => {
    return [
      styles.indicator,
      styles.indicatorActive,
      {
        backgroundColor: theme.colorScheme.primary,
      },
    ];
  }, [theme]);

  const labelInactiveStyle = useMemo(() => {
    return [
      styles.labelInactive,
      {
        color: theme.textColorScheme.secondary,
      },
    ];
  }, [theme]);

  const labelActiveStyle = useMemo(() => {
    return [
      styles.labelActive,
      {
        color: theme.colorScheme.primary,
      },
    ];
  }, [theme]);

  return (
    <View style={containerStyle}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;
        const IconComponent = TAB_BAR_ICON[index].bundle;
        const iconName = TAB_BAR_ICON[index].name;

        const isFocused = state.index === index;
        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            navigation.navigate({
              key: route.key,
              name: route.name,
              merge: true,
            });
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.btnContainer}>
            {isFocused && <View style={indicatorActiveStyle} />}
            <View>
              <IconComponent
                name={iconName}
                solid
                style={[
                  labelInactiveStyle,
                  styles.icon,
                  isFocused && labelActiveStyle,
                ]}
              />
              {!!totalUnread && TAB_BAR_ICON[index].name === 'bell' && (
                <View
                  style={[
                    styles.badgeContainer,
                    {
                      backgroundColor: theme.colorScheme.primary,
                      borderColor: theme.colorScheme.onPrimary,
                    },
                  ]}>
                  <TextView
                    style={[
                      {
                        color: theme.colorScheme.onPrimary,
                        fontSize: 7,
                      },
                    ]}>
                    {totalUnread}
                  </TextView>
                </View>
              )}
            </View>
            <TextView
              style={[
                labelInactiveStyle,
                styles.label,
                isFocused && labelActiveStyle,
              ]}>
              {label}
            </TextView>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default CustomTab;
