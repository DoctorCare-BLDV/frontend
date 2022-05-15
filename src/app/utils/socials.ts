import {DEFAULT_AVATAR} from '@assets';
import {User} from '@data/models';

export const getUserAvatarForImage = (user?: User) => {
  if (!user?.avatar?.url) return DEFAULT_AVATAR;
  return {
    uri: typeof user.avatar.url === 'string' ? user.avatar.url : DEFAULT_AVATAR,
  };
};
