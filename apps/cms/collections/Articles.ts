/**
 * @author Hung Vu
 *
 * This collection represents a blog article.
 */

import { CollectionConfig } from 'payload/types';
import isLoggedIn from '../access/validator/isLoggedIn';
import isPublished from '../access/query/isPublished';

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
    read: (req) => {
      // return isLoggedIn(req)
      if (isLoggedIn(req)) return true;

      return {
        and: [
          isPublished(),
          {
            'pageSettings.settingsScheduledReleaseDate': {
              less_than: new Date().toJSON(),
            },
          },
        ],
      };
    },
  },
  fields: [
    {
      name: 'pageSettings',
      type: 'group',
      admin: {
        position: 'sidebar',
      },
      fields: [
        {
          name: 'settingsUrlSlug',
          label: 'URL Slug',
          type: 'text',
          required: true, // Show red * in the field, but its validation is overridden by "validate"
          unique: true,
          index: true,
          admin: {
            description: 'Every article must have a unique URL slug.',
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
          name: 'settingsScheduledReleaseDate',
          label: 'Scheduled Release Date',
          type: 'date',
          required: true,
          // Implementation reference: https://github.com/payloadcms/public-demo/blob/501e2e1bf73501fbfd9e140f81b28601ab9ff01e/src/collections/Posts.ts#L70
          defaultValue: () => new Date(),
        },
        {
          name: 'settingsCategories',
          label: 'Categories',
          type: 'relationship',
          relationTo: 'categories',
          hasMany: false,
          required: true,
          filterOptions: {
            _status: {
              equals: 'published',
            },
          },
        },
        {
          name: 'settingsTags',
          label: 'Tags',
          type: 'relationship',
          relationTo: 'tags',
          hasMany: true,
          required: true,
          filterOptions: {
            _status: {
              equals: 'published',
            },
          },
        },
        {
          name: 'settingsSeries',
          label: 'Series',
          type: 'relationship',
          relationTo: 'series',
          hasMany: false,
          filterOptions: {
            _status: {
              equals: 'published',
            },
          },
        },
        {
          name: 'settingsCoverImage',
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
          name: 'settingsHideFromHome',
          label: 'Hide From Home Page?',
          type: 'radio',
          options: [
            {
              label: 'Yes',
              value: 'yes',
            },
            {
              label: 'No',
              value: 'no',
            },
          ],
          defaultValue: 'no',
          required: true,
        },
      ],
    },
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
          admin: {
            description: 'Articles must have unique meta titles.',
          },
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
          filterOptions: {
            _status: {
              equals: 'published',
            },
          },
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
          admin: {
            description: 'Articles must have unique content titles',
          },
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
    drafts: {
      autosave: true,
    },
  },
};

export default Articles;
