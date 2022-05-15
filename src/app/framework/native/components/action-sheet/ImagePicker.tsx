import React, {memo} from 'react';
import {Platform} from 'react-native';
import {
  check,
  Permission,
  PERMISSIONS,
  request,
  RESULTS,
} from 'react-native-permissions';
import RNImagePicker, {Options, Image} from 'react-native-image-crop-picker';

import {delay} from '@app/resources';

import {ActionSheet} from './ActionSheet';
import {showMessage} from 'react-native-flash-message';
import {formatImagePickerToApiImage, normalizeImages} from '@app/utils';
import {PostImageAPI} from '@data/models';

export enum PhotoPickerOption {
  CAMERA = 'camera',
  LIBRARY = 'library',
}

export interface ImagePickerProps {
  visible: boolean;
  onClose: () => void;
  onDone: (image: PostImageAPI) => void;
}

const ImgPickerOptions: Options = {
  multiple: false,
  forceJpg: true,
  mediaType: 'photo',
};

const CAMERA_PERMISSION =
  Platform.OS === 'ios' ? PERMISSIONS.IOS.CAMERA : PERMISSIONS.ANDROID.CAMERA;

const LIBRARY_PERMISSION =
  Platform.OS === 'ios'
    ? PERMISSIONS.IOS.PHOTO_LIBRARY
    : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE;

export const ImagePicker = memo((props: ImagePickerProps) => {
  const {onClose, onDone} = props;

  const onSelectImg = React.useCallback(
    (img?: Image) => {
      if (!img) return;
      const images = normalizeImages([img]);
      const convertedImg = formatImagePickerToApiImage(images[0]);
      onDone(convertedImg);
    },
    [onDone],
  );

  const requestPermission = React.useCallback(
    async (permission: Permission) => {
      let granted = await check(permission);
      if (granted !== RESULTS.GRANTED) {
        granted = await request(permission);
      }

      return granted === RESULTS.GRANTED;
    },
    [],
  );

  const handlePermissions = React.useCallback(
    async (option: PhotoPickerOption) => {
      let permission: {type: PhotoPickerOption | undefined; granted: boolean} =
        {type: undefined, granted: false};
      switch (option) {
        case PhotoPickerOption.CAMERA:
          const cameraGranted = await requestPermission(CAMERA_PERMISSION);
          permission = {type: option, granted: cameraGranted};

          break;
        case PhotoPickerOption.LIBRARY:
          const libraryGranted = await requestPermission(LIBRARY_PERMISSION);
          permission = {type: option, granted: libraryGranted};

          break;
      }
      onClose();
      if (!permission.granted) {
        showMessage({
          message:
            'Vui lòng cấp quyền camera và thư viện ảnh để upload avatar!',
          type: 'warning',
          duration: 3000,
          hideOnPress: true,
        });
      }
      await delay(350);
      if (option === PhotoPickerOption.LIBRARY) {
        return RNImagePicker.openPicker(ImgPickerOptions)
          .then(onSelectImg)
          .catch(() => onSelectImg());
      }
      RNImagePicker.openCamera(ImgPickerOptions)
        .then(onSelectImg)
        .catch(() => onSelectImg());
    },
    [onClose, onSelectImg, requestPermission],
  );

  const ActionSheetData = React.useMemo(() => {
    return [
      {
        icon: null,
        title: 'Mở camera',
        onPress: () => handlePermissions(PhotoPickerOption.CAMERA),
      },
      {
        icon: null,
        title: 'Mở thư viện ảnh',
        onPress: () => handlePermissions(PhotoPickerOption.LIBRARY),
      },
    ];
  }, [handlePermissions]);

  return <ActionSheet data={ActionSheetData} {...props} />;
});
