/**
 * @author Hung Vu
 *
 * This collection represents a metadata for a static route.
 */

import { CollectionConfig } from 'payload/types';

const StaticRouteMetadata: CollectionConfig = {
  slug: 'static-route-metadata',
  admin: {
    useAsTitle: 'slug',
    defaultColumns: [
      'title',
      'createdAt',
      'updatedAt',
      '_status',
    ],
  },
  access: {
    read: () => true
  },
  fields: [
    {
      name: 'isRoot',
      label: 'Root, no URL slug',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'slug',
      label: 'URL Slug',
      type: 'text',
      required: true, // Show red * in the field, but its validation is overridden by "validate"
      unique: true,
      index: true,
      admin: {
        description: 'Every route must have a unique URL slug.',
        condition: (data) => {
          return !data.isRoot;
        },
      },
      validate: async (value, { operation }) => {
        if (operation === 'create' || operation === 'update') {
          // Value is undefined during admin UI navigation
          // This crashes the validation process and causes unexpected behavior
          // Turn value into an empty string instead as a workaround
          value = value ?? '';
          const re = /^[a-z0-9-]+$/;
          return value.match(re)
            ? true
            : 'URL slug must contain only lower case characters from a to z, 0 to 9, or hyphen.';
        }
      },
    },
    {
      name: 'images',
      label: 'Cover Image',
      type: 'upload',
      relationTo: 'media',
      required: true,
      filterOptions: {
        _status: {
          equals: 'published',
        },
      },
    },
    {
      name: 'seoTitle',
      label: 'SEO Title',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      minLength: 1,
      maxLength: 60,
      admin: {
        description: 'A static route must have a unique SEO title.',
      },
    },
    {
      name: 'seoDescription',
      label: 'SEO Description',
      type: 'textarea',
      required: true,
      minLength: 1,
      maxLength: 160,
    },
  ],
  timestamps: true,
  versions: {
    drafts: {
      autosave: true,
    },
  },
};

export default StaticRouteMetadata;