/**
 * @author Hung Vu
 *
 * This collection represents uploaded media
 */

import { CollectionConfig } from 'payload/types';

const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: (): boolean => true,
  },
  upload: {
    staticURL: '/media',
    staticDir: 'media',
    imageSizes: [
      {
        name: 'thumbnail',
        width: 400,
        height: 300,
        crop: 'centre',
      },
      {
        name: 'cover',
        width: 1600,
        height: 840,
        crop: 'centre'
      },
      {
        name: 'og',
        width: 1200,
        height: 630,
        crop: 'centre'
      },
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