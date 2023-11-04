/**
 * @author Hung Vu
 *
 * This collection represents uploaded media
 */

import { CollectionConfig } from 'payload/types';
import isLoggedIn from '../access/validator/isLoggedIn';
import isPublished from '../access/query/isPublished';

const Media: CollectionConfig = {
  slug: 'media',
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
