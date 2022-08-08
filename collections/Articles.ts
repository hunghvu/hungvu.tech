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
        },
        {
          name: 'metaDescription',
          label: 'SEO Description',
          type: 'text',
        },
        {
          name: 'metaScheduledReleaseDate',
          label: 'Scheduled Release Date',
          type: 'date',
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
        },
        {
          name: 'contentSubTitle',
          label: 'Article Subtitle',
          type: 'text',
        },
        {
          name: 'contentBody',
          label: 'Article Body',
          type: 'richText',
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
