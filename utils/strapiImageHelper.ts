import type { StrapiImage } from '@types';
import { ImageFormat } from '@types';

export function getImage(image: StrapiImage | File, format: ImageFormat) {
  const { blogApiUrl } = usePublicConfig();

  if (process.client) {
    if (image instanceof File) {
      return URL.createObjectURL(image);
    }
  }
  if (!image?.formats) return null;

  return `${blogApiUrl}${checkForImage(image, format)}`;
}

export function getVideo(url: string) {
  const { blogApiUrl } = usePublicConfig();
  return `${blogApiUrl}${url}`;
}

const map: Record<ImageFormat, ImageFormat> = {
  [ImageFormat.LARGE]: ImageFormat.MEDIUM,
  [ImageFormat.MEDIUM]: ImageFormat.SMALL,
  [ImageFormat.SMALL]: ImageFormat.THUMBNAIL,
  [ImageFormat.THUMBNAIL]: ImageFormat.NONE,
  [ImageFormat.NONE]: ImageFormat.NONE,
};

const checkForImage: any = (image: StrapiImage, format: ImageFormat) => {
  if (format === ImageFormat.NONE) return '';
  if (image.formats[format]) {
    return image.formats[format].url;
  } else {
    return checkForImage(image, map[format]);
  }
};

export function getBlurhash(image: StrapiImage) {
  return image.blurhash ? image.blurhash : 'LFHAdYNJ06xX$$WWWEoK07s-~7az';
}
