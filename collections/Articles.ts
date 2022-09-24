/**
 * @author Hung Vu
 *
 * This collection represents a blog article.
 */

import { CollectionConfig } from 'payload/types';

const readQuery = {
  and: [
    {
      _status: {
        equals: 'published',
      },
    },
    {
      // Implementation reference: https://github.com/payloadcms/public-demo/blob/501e2e1bf73501fbfd9e140f81b28601ab9ff01e/src/collections/Posts.ts#L34
      settingsScheduledReleaseDate: {
        less_than: new Date().toJSON(),
      },
    },
  ],
};

const Articles: CollectionConfig = {
  slug: 'articles',
  admin: {
    useAsTitle: 'contentTitle',
    defaultColumns: [
      // Some columns name are based on JSON response properties
      'contentTitle',
      'createdAt',
      'updatedAt',
      '_status',
    ],
  },
  access: {
    // By default, other actions require user login to perform
    // Therefore, no need to implement
    read: ({ req: { user } }) => {
      if (user) {
        return true;
      }
      return readQuery;
    },
  },
  fields: [
    {
      label: 'Page Meta',
      type: 'collapsible',
      fields: [
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
        {
          name: 'metaCustomOgImage',
          label: 'Custom OG Image (front-end will fallback to cover image if not presented)',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
    {
      label: 'Page Settings',
      type: 'collapsible',
      fields: [
        {
          name: 'settingsUrlSlug',
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
          name: 'settingsScheduledReleaseDate',
          label: 'Scheduled Release Date',
          type: 'date',
          // admin: {

          // },
          required: true,
          // Implementation reference: https://github.com/payloadcms/public-demo/blob/501e2e1bf73501fbfd9e140f81b28601ab9ff01e/src/collections/Posts.ts#L70
          defaultValue: () => new Date(),
        },
        {
          name: 'settingsTags',
          label: 'Tags',
          type: 'relationship',
          relationTo: 'tags',
          hasMany: true,
          required: true,
        },
        {
          name: 'settingsSeries',
          label: 'Series',
          type: 'relationship',
          relationTo: 'series',
          hasMany: false,
        },
        {
          name: 'settingsCoverImage',
          label: 'Cover Image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
    {
      label: 'Page Content',
      type: 'collapsible',
      fields: [
        {
          name: 'contentTitle',
          label: 'Article Title',
          type: 'text',
          required: true,
          index: true,
          unique: true,
          minLength: 1,
        },
        {
          name: 'contentSubTitle',
          label: 'Article Subtitle',
          type: 'textarea',
          required: true,
          minLength: 1,
          maxLength: 300,
        },
        {
          name: 'contentBody',
          label: 'Article Body',
          type: 'richText',
          // Min length is not applicable to richText
          required: true,
        },
      ],
    },
  ],
  timestamps: true,
  versions: {
    drafts: true,
  },
};

export default Articles;
