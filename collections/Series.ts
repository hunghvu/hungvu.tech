/**
 * @author Hung Vu
 *
 * This collection represents articles series.
 */

import { CollectionConfig } from 'payload/types';

const readQuery = {
  and: [
    {
      _status: {
        equals: 'published',
      },
    },
  ],
};

const Series: CollectionConfig = {
  slug: 'series',
  admin: {
    useAsTitle: 'seriesTitle',
    defaultColumns: ['seriesTitle', 'seriesDescription', 'createdAt', 'updatedAt', '_status'],
  },
  access: {
    read: ({ req: { user } }) => {
      if (user) {
        return true;
      }
      return readQuery;
    },
  },
  fields: [
    {
      name: 'seriesTitle',
      label: 'Series Title',
      type: 'text',
      required: true,
      index: true,
      unique: true,
      minLength: 1,
      maxLength: 60,
    },
    {
      name: 'seriesDescription',
      label: 'Series Description',
      type: 'textarea',
      required: true,
      minLength: 1,
      maxLength: 300,
    },
  ],
  timestamps: true,
  versions: {
    drafts: true,
  },
};

export default Series;
