import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageSourcePropType,
} from 'react-native';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {getStatusBarHeight} from 'react-native-iphone-x-helper';
import {faAngleLeft} from '@fortawesome/free-solid-svg-icons';
import {Icon} from '@fortawesome/fontawesome-svg-core';

import {Colors} from '@app/resources';

import {TextView} from '../label';

export interface HeaderProps {
  title?: string;
  titlePosition?: 'center' | 'left' | 'right';
  leftComponent?: React.ReactNode;
  leftIcon?: ImageSourcePropType;
  rightComponent?: React.ReactNode;
  rightIcon?: ImageSourcePropType;
  leftOnpress?: () => void;
  rightOnpress?: () => void;
}

export const NormalHeader: React.FC<HeaderProps> = props => {
  const {
    leftComponent,
    leftIcon,
    leftOnpress = () => {},
    rightComponent,
    rightIcon,
    rightOnpress = () => {},
    title,
    titlePosition = 'center',
  } = props;

  const renderLefComponent = () => {
    if (leftComponent) {
      return leftComponent;
    }
    if (leftIcon) {
      return <Image source={leftIcon} />;
    }
    return (
      <FontAwesomeIcon
        icon={faAngleLeft as Icon}
        color={Colors.WHITE}
        size={20}
      />
    );
  };

  const renderRightComponent = () => {
    if (rightComponent) {
      return rightComponent;
    }
    if (rightIcon) {
      return <Image source={rightIcon} />;
    }
    return null;
  };

  return (
    <View style={StyleSheet.flatten([styles.container])}>
      <View style={styles.content}>
        <TouchableOpacity onPress={leftOnpress} style={styles.leftWrapper}>
          {renderLefComponent()}
        </TouchableOpacity>
        <TextView
          text={title || ''}
          style={[styles.title, {textAlign: titlePosition}]}
        />
        <TouchableOpacity onPress={rightOnpress} style={styles.rightWrapper}>
          {renderRightComponent()}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: getStatusBarHeight(true),
    backgroundColor: Colors.PRIMARY_ORAGE,
  },
  content: {
    height: 55,
    flexDirection: 'row',
    alignItems: 'center',
  },
  leftWrapper: {
    width: 30,
    height: 30,
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginLeft: 16,
  },
  rightWrapper: {
    width: 30,
    height: 30,
    alignItems: 'flex-end',
    justifyContent: 'center',
    marginRight: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.WHITE,
    flex: 1,
  },
});
