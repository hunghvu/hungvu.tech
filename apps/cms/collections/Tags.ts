/**
 * @author Hung Vu
 *
 * This collection represents an article tag.
 */

import { CollectionConfig } from 'payload/types';
import isLoggedIn from '../access/validator/isLoggedIn';
import isPublished from '../access/query/isPublished';

const Tags: CollectionConfig = {
  slug: 'tags',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'description', 'createdAt', 'updatedAt', '_status'],
  },
  access: {
    read: (req) => isLoggedIn(req) || isPublished(),
  },
  fields: [
    {
      name: 'title',
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
          const re = /^[a-zA-Z0-9- ]+$/;
          return value.match(re)
            ? true
            : 'Tag title can only contains alphanumerical characters, hyphen, and space. E.g., #Google-search-123 456';
        }
      },
    },
    {
      name: 'description',
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
