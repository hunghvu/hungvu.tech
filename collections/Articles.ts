/**
 * @author Hung Vu
 *
 * This collection represents a blog article.
 */

import { CollectionConfig } from 'payload/types';

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
    ]
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      label: 'Page Meta',
      type: 'collapsible',
      fields: [
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
        {
          name: 'metaScheduledReleaseDate',
          label: 'Scheduled Release Date',
          type: 'date',
          admin: {
            date: {
              // Relax the restriction here because it cannot keep up in real time
              // Min date is rather sufficient
              minDate: new Date(),
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
