/**
 * Author: Hung Vu
 *
 * This collection represents uploaded media
 */

import type { CollectionConfig } from 'payload/types';
import isLoggedIn from '../access/validator/is-logged-in';
import isPublished from '../access/query/is-published';

const Media: CollectionConfig = {
  slug: 'media',
  admin: {
    group: 'Global Content Material'
  },
  access: {
    read: (req) => isLoggedIn(req) || isPublished(),
  },
  upload: {
    staticURL: '/media',
    staticDir: 'media',
    imageSizes: [
      {
        name: 'cover',
        width: 1600,
        height: 840,
        crop: 'centre',
      },
      {
        name: 'og',
        width: 1200,
        height: 630,
        crop: 'centre',
      },
      {
        name: 'embed',
        width: 800,
        height: 420,
        crop: 'centre',
      },
      {
        name: 'thumbnail',
        width: 400,
        height: 210,
        crop: 'centre',
      }
    ],
    adminThumbnail: 'thumbnail',
    mimeTypes: ['image/*', 'video/*'],
  },
  fields: [
    {
      name: 'alt',
      label: 'Alt Text',
      type: 'text',
      required: true,
    },
  ],
  timestamps: true,
  versions: {
    drafts: true,
  },
};

export default Media;
