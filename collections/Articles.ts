/**
 * @author Hung Vu
 *
 * This collection represents a blog article.
 */

import { CollectionConfig } from 'payload/types';

const Articles: CollectionConfig = {
  slug: 'articles',
  admin: {
    useAsTitle: 'title',
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
