import type { Base } from './Base';

export interface StrapiImage extends Base {
  url: string;
  name: string;
  alternativeText: string;
  caption: string;
  hash: string;
  ext: string;
  blurhash: string;
  formats: {
    [ImageFormat.LARGE]: StrapiImageFormat;
    [ImageFormat.SMALL]: StrapiImageFormat;
    [ImageFormat.MEDIUM]: StrapiImageFormat;
    [ImageFormat.THUMBNAIL]: StrapiImageFormat;
  };
  width: number;
  height: number;
}

export enum ImageFormat {
  LARGE = 'large',
  SMALL = 'small',
  MEDIUM = 'medium',
  THUMBNAIL = 'thumbnail',
  NONE = 'none',
}

export type StrapiImageFormat = {
  ext: string;
  url: string;
  hash: string;
  mime: string;
  name: string;
  path: string;
  size: number;
  width: number;
  height: number;
};
