/**
 * @author Hung Vu
 *
 * This collection represents articles tags.
 */

import { CollectionConfig } from 'payload/types';

const Tags: CollectionConfig = {
  slug: 'tags',
  admin: {
    useAsTitle: 'tagTitle',
  },
  fields: [
    {
      label: 'Tag Meta',
      type: 'collapsible',
      fields: [
        {
          name: 'metaCoverImage',
          label: 'Cover Image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'metaCustomOgImage',
          label: 'Custom OG Image (front-end will fallback to cover image if not presented)',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'metaUrlSlug',
          label: 'URL Slug',
          type: 'text',
          required: true, // Show red * in the field, but its validation is overridden by "validate"
          unique: true,
          index: true,
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
          name: 'metaTitle',
          label: 'SEO Title',
          type: 'text',
          required: true,
          unique: true,
          index: true,
          minLength: 1,
          maxLength: 60,
        },
        {
          name: 'metaDescription',
          label: 'SEO Description',
          type: 'textarea',
          required: true,
          minLength: 1,
          maxLength: 160,
        },
      ],
    },
    {
      label: 'Tag Content',
      type: 'collapsible',
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
    },
  ],
  timestamps: true,
  versions: {
    drafts: true
  },
};

export default Tags;
