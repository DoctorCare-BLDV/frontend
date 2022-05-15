import {PostImageAPI} from '@data/models';
import {Image} from 'react-native-image-crop-picker';

export const normalizeImages = (images: any[]) => {
  return images.map(img => {
    img.id = new Date().getTime();
    if (!img.filename) {
      img.filename = `${new Date().getTime()}`;
    }
    if (!img.fileName) {
      img.fileName = `${new Date().getTime()}`;

      if (img.mime) {
        img.fileName += '.' + img.mime.split('image/')[1];
      } else {
        img.fileName += '.jpeg';
      }
    }
    if (img.data) {
      img.uploadPath = img.data;
      img.isBase64 = true;
    }

    if (img.sourceURL) {
      img.uri = img.sourceURL;
    } else if (img.path) {
      img.uri = img.path;
    }

    if (img.sourceURL || img.uri) {
      img.url = img.sourceURL || img.uri;
    }
    return img;
  });
};

export const formatImagePickerToApiImage: (
  image: Image | any,
) => PostImageAPI = (image: Image | any) => {
  const mime = (image?.mime || image?.mediaType || 'image/jpg').toLowerCase();
  const [type, extension] = mime.split('/');

  const fileName = (
    image?.fileName || Date.now().toString() + '.' + extension
  ).toLowerCase();

  let nativeUrl: string = image?.data || image?.path || image?.sourceURL || '';
  if (nativeUrl) {
    if (image?.data && type === 'image' && !nativeUrl.startsWith('data:')) {
      nativeUrl = 'data:' + mime + ';base64,' + nativeUrl;
    } else if (!image?.data && !nativeUrl.startsWith('file://')) {
      nativeUrl = 'file://' + nativeUrl;
    }
  }

  return {
    uri: nativeUrl || image?.url || '',
    name: fileName,
    type: mime,
  };
};
