/**
 * Author: Hung Vu
 *
 * This collection represents a blog article.
 */

import type { CollectionConfig } from 'payload/types';
import isLoggedIn from '../access/validator/is-logged-in';
import isPublished from '../access/query/is-published';

const Articles: CollectionConfig = {
  slug: 'articles',
  admin: {
    useAsTitle: 'title',
    defaultColumns: [
      // Some columns name are implicitly created by Payload.
      'title',
      'series',
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
            'settings.scheduledReleaseDate': {
              less_than: new Date().toJSON(),
            },
          },
        ],
      };
    },
  },
  fields: [
    {
      name: 'settings',
      type: 'group',
      admin: {
        position: 'sidebar',
      },
      fields: [
        // Inspired by Hashnode's article editor.
        {
          name: 'slug',
          label: 'URL Slug',
          type: 'text',
          required: true, // Show red * in the field, but its validation is overridden by "validate"
          unique: true,
          index: true,
          admin: {
            description: 'Every article must have a unique URL slug.',
          },
          validate: (value, { operation }) => {
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
          name: 'tags',
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
          name: 'series',
          label: 'Series',
          type: 'relationship',
          relationTo: 'series',
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
            description: 'An article must have a unique SEO title.',
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
        {
          name: 'scheduledReleaseDate',
          label: 'Scheduled Release Date',
          type: 'date',
          required: true,
          // Implementation reference: https://github.com/payloadcms/public-demo/blob/501e2e1bf73501fbfd9e140f81b28601ab9ff01e/src/collections/Posts.ts#L70
          defaultValue: () => new Date(),
          admin: {
            date: {
              pickerAppearance: 'dayAndTime',
            },
          }
        },
        {
          name: 'hideFromHome',
          label: 'Hide From Home Page?',
          type: 'checkbox',
          defaultValue: false,
        },
        {
          name: 'customizedCreatedAt',
          label: 'Customized create at (front end only)',
          type: 'date',
          admin: {
            date: {
              pickerAppearance: 'dayAndTime',
            },
          },
        },
        {
          name: 'customizedUpdatedAt',
          label: 'Customized update at (front end only)',
          type: 'date',
          admin: {
            date: {
              pickerAppearance: 'dayAndTime',
            },
          },
        },
      ],
    },
    {
      name: 'title',
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
      name: 'subTitle',
      label: 'Article Subtitle',
      type: 'textarea',
      required: true,
      minLength: 1,
      maxLength: 300,
    },
    {
      name: 'body',
      label: 'Article Body',
      type: 'richText',
      required: true,
    },

  ],
  timestamps: true,
  versions: {
    drafts: {
      autosave: {
        interval: 1000 * 15 // Autosave every 15 seconds
      },
    },
  },
};

export default Articles;
