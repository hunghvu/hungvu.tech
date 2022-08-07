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
      name: 'urlSlug',
      label: 'URL Slug',
      type: 'text',
    },
    {
      name: 'title',
      label: 'Article Title',
      type: 'text',
    },
    {
      name: 'subTitle',
      label: 'Article Subtitle',
      type: 'text',
    },
    {
      name: 'content',
      label: 'Article Content',
      type: 'richText',
    },
  ],
  timestamps: true,
};

export default Articles;
