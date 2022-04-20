import React from 'react';
import {} from 'react-native';
// import from library
import {SafeAreaView} from 'react-native-safe-area-context';
// import from alias
import {Text} from '@native/components';
// localImport
import {use{{name}}Model} from './{{kebabCase name}}.hook';
import { {{name}}Props } from './{{kebabCase name}}.type';
import {styles} from './{{kebabCase name}}.style';

const _{{name}}: React.FC<{{name}}Props> = props => {
  const {} = props;
  const {} = use{{name}}Model();

  return (
    <SafeAreaView style={[styles.container]}>
      <Text />
    </SafeAreaView>
  );
};

export const {{name}} = React.memo(_{{name}});
