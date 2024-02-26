/**
 * Author: Hung Vu
 *
 * This collection represents a blog article.
 */

/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-misused-promises */
import type { CollectionConfig } from 'payload/types';
import type { Endpoint } from "payload/config";
import isLoggedIn from '../access/validator/is-logged-in';
import isPublished from '../access/query/is-published';


const getArticlesIgnoreRedundantFields = (): Omit<Endpoint, 'root'> => {
  return {
    path: '/ignore-redundant-fields',
    method: 'get',
    handler: async (req, res) => {
      try {
        const resAllArticles = await req.payload.find({
          collection: 'articles',
          limit: 10000,
          where: {
            and: [
              isPublished(),
              {
                'settings.scheduledReleaseDate': {
                  less_than: new Date().toJSON(),
                },
              },
            ],
          }
        });
        const necessaryFields = resAllArticles.docs.map((article) => {
          const { body, _status, ...restArticles } = article;

          // For a repetitive local Postman test, this seems to reduce about 50ms in response time
          // Even though there is a nested loop, seems like it is a net positive.
          const { images, seoTitle, seoDescription, scheduledReleaseDate, ...restSettings } = restArticles.settings;
          restArticles.settings = restSettings as any;
          const restTags = restArticles.settings.tags.map((tag) => {
            const { createdAt, updatedAt, _status, ...rest } = tag as any;
            return rest;
          });
          restArticles.settings.tags = restTags as any;


          return restArticles;
        });
        resAllArticles.docs = necessaryFields as any;
        res.status(200).json(resAllArticles);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    }
  }
}

const getArticlesInTheSameSeries = (): Omit<Endpoint, 'root'> => {
  return {
    path: '/in-series/:id',
    method: 'get',
    handler: async (req, res) => {
      try {
        const resAllArticles = await req.payload.find({
          collection: 'articles',
          limit: 10000,
          where: {
            "settings.series": {
              equals: req.params.id
            },
            and: [
              isPublished(),
              {
                'settings.scheduledReleaseDate': {
                  less_than: new Date().toJSON(),
                },
              },
            ],
          }
        });
        const necessaryFields = resAllArticles.docs.map((article) => {
          const { title, ...restArticles } = article;
          // Time reduced is insignificant, but we reduce the payload size by 75%.
          const { slug, ..._restSettings } = restArticles.settings;
          return ({ title, settings: { slug } }) as any;
        });
        resAllArticles.docs = necessaryFields as any;
        res.status(200).json(resAllArticles);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    }
  }
}



const Articles: CollectionConfig = {
  slug: 'articles',
  admin: {
    group: 'Blog',
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
          index: true,
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
          label: 'Publish backdate (front end only)',
          type: 'date',
          admin: {
            date: {
              pickerAppearance: 'dayAndTime',
            },
          },
        },
        {
          name: 'customizedUpdatedAt',
          label: 'Update backdate (front end only)',
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
  endpoints: [
    getArticlesIgnoreRedundantFields(),
    getArticlesInTheSameSeries(),
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
