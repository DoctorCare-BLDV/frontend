import React, {useCallback, useState} from 'react';

import {StyleSheet, TouchableOpacity} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faEye, faEyeSlash} from '@fortawesome/free-solid-svg-icons';
import {TextField, TextFieldProps} from './TextField';

type PasswordInputProps = {};

const _PasswordInput: React.FC<PasswordInputProps & TextFieldProps> = props => {
  const {containerStyle} = props;
  const [hiddenPass, setHiddenPass] = useState<boolean>(true);
  const onTapSuffix = useCallback(() => {
    setHiddenPass(pre => !pre);
  }, []);

  return (
    <TextField
      containerStyle={containerStyle}
      inputProps={{
        ...props.inputProps,
        secureTextEntry: hiddenPass,
      }}
      suffix={
        <TouchableOpacity style={_styles.suffix} onPress={onTapSuffix}>
          <FontAwesomeIcon icon={hiddenPass ? faEye : faEyeSlash} />
        </TouchableOpacity>
      }
    />
  );
};

const _styles = StyleSheet.create({
  suffix: {
    height: '100%',
    justifyContent: 'center',
    paddingHorizontal: 5,
  },
});

export const PasswordInput = React.memo(_PasswordInput);
