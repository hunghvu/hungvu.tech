/**
 * @author Hung Vu
 *
 * This collection represents articles series.
 */

import { CollectionConfig } from 'payload/types';
import isLoggedIn from '../access/validator/isLoggedIn';
import isPublished from '../access/query/isPublished';

const Series: CollectionConfig = {
  slug: 'series',
  admin: {
    useAsTitle: 'seriesTitle',
    defaultColumns: ['seriesTitle', 'seriesDescription', 'createdAt', 'updatedAt', '_status'],
  },
  access: {
    read: (req) => isLoggedIn(req) || isPublished(),
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
