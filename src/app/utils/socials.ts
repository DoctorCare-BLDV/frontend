import {DEFAULT_AVATAR} from '@assets';
import {User} from '@data/models';

export const getUserAvatarForImage = (user?: User) => {
  if (!user?.avatar) return DEFAULT_AVATAR;
  return {
    uri: typeof user.avatar === 'string' ? user.avatar : DEFAULT_AVATAR,
  };
};
