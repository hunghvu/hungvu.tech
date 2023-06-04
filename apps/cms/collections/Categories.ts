/**
 * @author Hung Vu
 *
 * This collection represents articles categories.
 */

import { CollectionConfig } from 'payload/types';
import isLoggedIn from '../access/validator/isLoggedIn';
import isPublished from '../access/query/isPublished';

const Categories: CollectionConfig = {
  slug: 'categories',
  admin: {
    useAsTitle: 'categoriesTitle',
    defaultColumns: ['categoriesTitle', 'categoriesDescription', 'createdAt', 'updatedAt', '_status'],
  },
  access: {
    read: (req) => isLoggedIn(req) || isPublished(),
  },
  fields: [
    {
      name: 'categoriesTitle',
      label: 'Categories Title',
      type: 'text',
      required: true,
      index: true,
      unique: true,
      minLength: 1,
      maxLength: 60,
    },
    {
      name: 'categoriesDescription',
      label: 'Categories Description',
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

export default Categories;
