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
    'openwrt-toh': OpenwrtToh;
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
  password?: string | null;
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
    hideFromHome?: boolean | null;
    customizedCreatedAt?: string | null;
    customizedUpdatedAt?: string | null;
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
  slug: string;
  images: string | Media;
  seoTitle: string;
  seoDescription: string;
  updatedAt: string;
  createdAt: string;
  _status?: ('draft' | 'published') | null;
}
export interface OpenwrtToh {
  id: string;
  pid: string;
  devicetype?: string | null;
  brand?: string | null;
  model?: string | null;
  version?: string | null;
  fccid?: string | null;
  availability?: string | null;
  whereavailable?: string | null;
  supportedsincecommit?: string | null;
  supportedsincerel?: string | null;
  supportedcurrentrel?: string | null;
  unsupported_functions?: string | null;
  target?: string | null;
  subtarget?: string | null;
  packagearchitecture?: string | null;
  bootloader?: string | null;
  cpu?: string | null;
  cpucores?: string | null;
  cpumhz?: string | null;
  flashmb?: string | null;
  rammb?: string | null;
  ethernet100mports?: string | null;
  ethernetgbitports?: string | null;
  ethernet1gports?: string | null;
  ethernet2_5gports?: string | null;
  ethernet5gports?: string | null;
  ethernet10gports?: string | null;
  sfp_ports?: string | null;
  sfp_plus_ports?: string | null;
  switch?: string | null;
  vlan?: string | null;
  modem?: string | null;
  commentsnetworkports?: string | null;
  wlanhardware?: string | null;
  wlan24ghz?: string | null;
  wlan50ghz?: string | null;
  wlancomments?: string | null;
  wlandriver?: string | null;
  detachableantennas?: string | null;
  bluetooth?: string | null;
  usbports?: string | null;
  sataports?: string | null;
  commentsusbsataports?: string | null;
  videoports?: string | null;
  audioports?: string | null;
  phoneports?: string | null;
  commentsavports?: string | null;
  serial?: string | null;
  serialconnectionparameters?: string | null;
  jtag?: string | null;
  ledcount?: string | null;
  buttoncount?: string | null;
  gpios?: string | null;
  powersupply?: string | null;
  devicepage?: string | null;
  owrt_forum_topic_url?: string | null;
  lede_forum_topic_url?: string | null;
  forumsearch?: string | null;
  gitsearch?: string | null;
  wikideviurl?: string | null;
  oemdevicehomepageurl?: string | null;
  firmwareoemstockurl?: string | null;
  firmwareopenwrtinstallurl?: string | null;
  firmwareopenwrtupgradeurl?: string | null;
  firmwareopenwrtsnapshotinstallurl?: string | null;
  firmwareopenwrtsnapshotupgradeurl?: string | null;
  installationmethods?: string | null;
  commentinstallation?: string | null;
  recoverymethods?: string | null;
  commentrecovery?: string | null;
  comments?: string | null;
  page?: string | null;
  updatedAt: string;
  createdAt: string;
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