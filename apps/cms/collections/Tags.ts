/**
 * @author Hung Vu
 *
 * This collection represents articles tags.
 */

import { CollectionConfig } from 'payload/types';
import isLoggedIn from '../access/validator/isLoggedIn';
import isPublished from '../access/query/isPublished';

const Tags: CollectionConfig = {
  slug: 'tags',
  admin: {
    useAsTitle: 'tagTitle',
    defaultColumns: ['tagTitle', 'tagDescription', 'createdAt', 'updatedAt', '_status'],
  },
  access: {
    read: (req) => isLoggedIn(req) || isPublished(),
  },
  fields: [
    {
      name: 'tagTitle',
      label: 'Tag Title',
      type: 'text',
      required: true,
      index: true,
      unique: true,
      minLength: 1,
      validate: async (value, { operation }) => {
        if (operation === 'create' || operation === 'update') {
          // Value is undefined during admin UI navigation
          // This crashes the validation process and causes unexpected behavior
          // Turn value into an empty string instead as a workaround
          value = value ?? '';
          const re = /^[#][a-z0-9-]+$/;
          return value.match(re)
            ? true
            : 'Tag title must start with # and followed by only lower case characters from a to z, 0 to 9, or hyphen. E.g., #google-search-123';
        }
      },
    },
    {
      name: 'tagDescription',
      label: 'Tag Description',
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

export default Tags;
