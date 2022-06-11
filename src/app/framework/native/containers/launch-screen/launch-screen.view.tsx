import React from 'react';
import {ActivityIndicator, Image, SafeAreaView} from 'react-native';
// import from library
// import from alias
import {Colors} from '@app/resources';
import {LOGO} from '@assets';
// localImport
import {useLaunchScreenModel} from './launch-screen.hook';
import {LaunchScreenProps} from './launch-screen.type';
import {styles} from './launch-screen.style';

const _LaunchScreen: React.FC<LaunchScreenProps> = props => {
  const {} = props;
  const {} = useLaunchScreenModel();

  return (
    <SafeAreaView style={[styles.container]}>
      <Image
        style={styles.logo}
        source={LOGO}
        resizeMethod="scale"
        resizeMode="contain"
      />
      <ActivityIndicator style={styles.loading} color={Colors.GRAY} />
    </SafeAreaView>
  );
};

export const LaunchScreen = React.memo(_LaunchScreen);
