/* tslint:disable */
/* eslint-disable */
/**
 * This file was automatically generated by Payload.
 * DO NOT MODIFY IT BY HAND. Instead, modify your source Payload config,
 * and re-run `payload generate:types` to regenerate this file.
 */

export interface Config {
  collections: {
    users: User;
    articles: Article;
    media: Media;
    tags: Tag;
    series: Series;
    'static-route-metadata': StaticRouteMetadatum;
    'payload-preferences': PayloadPreference;
    'payload-migrations': PayloadMigration;
  };
  globals: {};
}
export interface User {
  id: string;
  updatedAt: string;
  createdAt: string;
  email: string;
  resetPasswordToken?: string | null;
  resetPasswordExpiration?: string | null;
  salt?: string | null;
  hash?: string | null;
  loginAttempts?: number | null;
  lockUntil?: string | null;
  password: string | null;
}
export interface Article {
  id: string;
  settings: {
    slug: string;
    tags: (string | Tag)[];
    images: string | Media;
    series?: (string | null) | Series;
    seoTitle: string;
    seoDescription: string;
    scheduledReleaseDate: string;
    hideFromHome: 'yes' | 'no';
  };
  title: string;
  subTitle: string;
  body: {
    [k: string]: unknown;
  }[];
  updatedAt: string;
  createdAt: string;
  _status?: ('draft' | 'published') | null;
}
export interface Tag {
  id: string;
  title: string;
  description: string;
  updatedAt: string;
  createdAt: string;
  _status?: ('draft' | 'published') | null;
}
export interface Media {
  id: string;
  alt: string;
  updatedAt: string;
  createdAt: string;
  _status?: ('draft' | 'published') | null;
  url?: string | null;
  filename?: string | null;
  mimeType?: string | null;
  filesize?: number | null;
  width?: number | null;
  height?: number | null;
  sizes?: {
    cover?: {
      url?: string | null;
      width?: number | null;
      height?: number | null;
      mimeType?: string | null;
      filesize?: number | null;
      filename?: string | null;
    };
    og?: {
      url?: string | null;
      width?: number | null;
      height?: number | null;
      mimeType?: string | null;
      filesize?: number | null;
      filename?: string | null;
    };
    embed?: {
      url?: string | null;
      width?: number | null;
      height?: number | null;
      mimeType?: string | null;
      filesize?: number | null;
      filename?: string | null;
    };
    thumbnail?: {
      url?: string | null;
      width?: number | null;
      height?: number | null;
      mimeType?: string | null;
      filesize?: number | null;
      filename?: string | null;
    };
  };
}
export interface Series {
  id: string;
  title: string;
  description: string;
  updatedAt: string;
  createdAt: string;
  _status?: ('draft' | 'published') | null;
}
export interface StaticRouteMetadatum {
  id: string;
  isRoot?: boolean | null;
  slug?: string | null;
  images: string | Media;
  seoTitle: string;
  seoDescription: string;
  updatedAt: string;
  createdAt: string;
  _status?: ('draft' | 'published') | null;
}
export interface PayloadPreference {
  id: string;
  user: {
    relationTo: 'users';
    value: string | User;
  };
  key?: string | null;
  value?:
    | {
        [k: string]: unknown;
      }
    | unknown[]
    | string
    | number
    | boolean
    | null;
  updatedAt: string;
  createdAt: string;
}
export interface PayloadMigration {
  id: string;
  name?: string | null;
  batch?: number | null;
  updatedAt: string;
  createdAt: string;
}


declare module 'payload' {
  export interface GeneratedTypes extends Config {}
}