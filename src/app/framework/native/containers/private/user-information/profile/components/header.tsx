import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import {Avatar} from 'react-native-elements';

import {Colors} from '@app/resources';
import {TextView} from '@app/framework/native/components';
import {useUser} from '@app/shared/contexts';
import {getUserAvatarForImage} from '@app/utils';

export interface HeaderProps {
  onSelectImg: () => void;
}

export const Header: React.FC<HeaderProps> = ({onSelectImg}) => {
  const {user} = useUser();
  return (
    <View style={styles.container}>
      <View>
        <Avatar
          source={getUserAvatarForImage(user)}
          containerStyle={styles.avatar}
          size={140}
          renderPlaceholderContent={<ActivityIndicator color={Colors.GRAY} />}
          rounded
        />
        <TouchableOpacity onPress={onSelectImg} style={styles.uploadAvatarIcon}>
          <FontAwesomeIcon color={Colors.WHITE} size={16} name="pencil" />
        </TouchableOpacity>
      </View>
      <TextView style={styles.name}>{user?.fullName}</TextView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {justifyContent: 'center', alignItems: 'center', flex: 1},
  avatar: {
    borderWidth: 3,
    borderColor: Colors.PRIMARY_ORAGE,
    alignSelf: 'center',
    marginTop: 30,
    overflow: 'hidden',
  },
  name: {
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 18,
    marginVertical: 16,
  },
  uploadAvatarIcon: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    backgroundColor: Colors.PRIMARY_ORAGE,
    borderRadius: 14,
    width: 28,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
