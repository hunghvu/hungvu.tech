/**
 * Author: Hung Vu
 *
 * This collection represents content for lab page.
 */

/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-misused-promises */
import type { CollectionConfig } from 'payload/types';
import type { Endpoint } from "payload/config";


const getLabsIgnoreRedundantFields = (): Omit<Endpoint, 'root'> => {
  return {
    path: '/ignore-redundant-fields',
    method: 'get',
    handler: async (req, res) => {
      try {
        const resAllLabs = await req.payload.find({
          collection: 'labs',
          limit: 10000,
        });
        const necessaryFields = resAllLabs.docs.map((labs) => {
          const { body, _status, ...restLabs } = labs;

          // For a repetitive local Postman test, this seems to reduce about 50ms in response time
          // Even though there is a nested loop, seems like it is a net positive.
          const { images, seoTitle, seoDescription, ...restSettings } = restLabs.settings;
          restLabs.settings = restSettings as any;
          const restTags = restLabs.settings.tags.map((tag) => {
            const { createdAt, updatedAt, _status, ...rest } = tag as any;
            return rest;
          });
          restLabs.settings.tags = restTags as any;


          return restLabs;
        });
        resAllLabs.docs = necessaryFields as any;
        res.status(200).json(resAllLabs);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    }
  }
}

const Labs: CollectionConfig = {
  slug: 'labs',
  admin: {
    group: 'Experiment',
    useAsTitle: 'title',
    defaultColumns: [
      // Some columns name are implicitly created by Payload.
      'title',
      'createdAt',
      'updatedAt',
      '_status',
    ],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'settings',
      type: 'group',
      admin: {
        position: 'sidebar',
      },
      fields: [
        {
          name: 'slug',
          label: 'URL Slug',
          type: 'text',
          required: true, // Show red * in the field, but its validation is overridden by "validate"
          unique: true,
          index: true,
          admin: {
            description: 'Every lab must have a unique URL slug.',
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
          name: 'seoTitle',
          label: 'SEO Title',
          type: 'text',
          required: true,
          unique: true,
          minLength: 1,
          maxLength: 60,
          admin: {
            description: 'A lab must have a unique SEO title.',
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
    },
    {
      name: 'title',
      label: 'Lab Title',
      type: 'text',
      required: true,
      unique: true,
      minLength: 1,
      admin: {
        description: 'Labs must have unique content titles',
      },
    },
    {
      name: 'subTitle',
      label: 'Lab Subtitle',
      type: 'textarea',
      required: true,
      minLength: 1,
      maxLength: 300,
    },
    {
      name: 'body',
      label: 'LAb Body',
      type: 'richText',
      required: true,
    },

  ],
  endpoints: [
    getLabsIgnoreRedundantFields(),
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

export default Labs;
