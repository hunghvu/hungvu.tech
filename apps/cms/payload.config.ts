/**
 * Author: Hung Vu
 */

import path from 'path';
import { buildConfig } from 'payload/config';
import { cloudStorage } from "@payloadcms/plugin-cloud-storage";
import { s3Adapter } from '@payloadcms/plugin-cloud-storage/s3';
import { mongooseAdapter } from '@payloadcms/db-mongodb';
import {
  BlockQuoteFeature,
  BlocksFeature,
  BoldTextFeature,
  HeadingFeature,
  InlineCodeTextFeature,
  ItalicTextFeature,
  LinkFeature,
  OrderedListFeature,
  ParagraphFeature,
  StrikethroughTextFeature,
  SubscriptTextFeature,
  SuperscriptTextFeature,
  TreeviewFeature,
  UnderlineTextFeature,
  UnoderedListFeature,
  UploadFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical';
import type { FeatureProvider } from '@payloadcms/richtext-lexical';
import { webpackBundler } from "@payloadcms/bundler-webpack";
import Articles from './collections/articles';
import CodeEditor from './blocks/code-snippet';
import Users from './collections/users';
import Media from './collections/media';
import Series from './collections/series';
import StaticRouteMetadata from './collections/static-route-metadata';
import Tags from './collections/tags';
import OpenwrtToh from "./collections/openwrt-toh";
import Labs from "./collections/labs";

const s3 = s3Adapter({
  config: {
    credentials: {
      accessKeyId: process.env.PAYLOAD_S3_ACCESS_KEY_ID!,
      secretAccessKey: process.env.PAYLOAD_S3_SECRET_ACCESS_KEY!,
    },
    endpoint: process.env.PAYLOAD_S3_ENDPOINT!,
    region: process.env.PAYLOAD_S3_REGION!,
  },
  bucket: process.env.PAYLOAD_S3_BUCKET!,
})

const lexicalEditorFeatures = (): FeatureProvider[] => {
  const features = [
    BoldTextFeature(),
    ItalicTextFeature(),
    UnderlineTextFeature(),
    StrikethroughTextFeature(),
    SubscriptTextFeature(),
    SuperscriptTextFeature(),
    InlineCodeTextFeature(),
    ParagraphFeature(),
    HeadingFeature({
      enabledHeadingSizes: ['h2', 'h3'],
    }),
    UnoderedListFeature(),
    OrderedListFeature(),
    LinkFeature({}),
    BlockQuoteFeature(),
    UploadFeature(),
    BlocksFeature({
      blocks: [CodeEditor]
    }),
  ];

  if (process.env.NODE_ENV === 'development') {
    features.push(
      TreeviewFeature(),
    );
  }
  return features;
}

export default buildConfig({
  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL!,
  admin: {
    user: Users.slug,
    bundler: webpackBundler(),
    webpack: (config) => {
      return {
        ...config,
        resolve: {
          ...config.resolve,
          fallback: {
            ...config.resolve.fallback,
            fs: false,
            path: false,
            os: false,
            util: false,
            process: false,
          }
        },
      }
    },
  },
  editor: lexicalEditor({
    features: () => lexicalEditorFeatures(),
  }),
  collections: [Users, Media, Tags, Articles, Series, StaticRouteMetadata, Labs, OpenwrtToh],
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  graphQL: {
    disable: true,
  },
  csrf: [process.env.PAYLOAD_FRONT_END_DOMAIN!, process.env.PAYLOAD_BACK_END_DOMAIN!],
  cors: [process.env.PAYLOAD_FRONT_END_DOMAIN!, process.env.PAYLOAD_BACK_END_DOMAIN!],
  db: mongooseAdapter({
    url: process.env.PAYLOAD_MONGODB_URI!,
    connectOptions: {
      dbName: process.env.PAYLOAD_MONGODB_DBNAME!,
    }
  }),
  express: {
    json: {
      // There seems to be an oversight,
      // this should be a mixed field, but payload requires a number field
      // it cannot parse a string field, even when the document suggests a string
      // https://payloadcms.com/docs/configuration/express#json
      //
      // Also, this only sets the limit on Express itself
      // but Payload uses body-parser, which has its own limit
      // not sure if this will cause a conflict, have to test out
      // Example of conflict mentioned: https://stackoverflow.com/questions/19917401/error-request-entity-too-large
      // Payload implementation (at least for middleware): https://github.com/payloadcms/payload/blob/1c6174ecb57687ad86bd4972c1040e04b6a0f9d6/packages/payload/src/express/middleware/index.ts#L2
      limit: 50000000, // in bytes = 50 MB
    },
  },
  rateLimit: {
    window: 60 * 1000, // 1 minute = 60 seconds = 60,000 milliseconds
    max: 50, // limit each IP to 50 requests per windowMs
    trustProxy: true,
  },
  plugins: [
    cloudStorage({
      enabled: process.env.NODE_ENV! === 'production',
      collections: {
        [Media.slug]: {
          adapter: s3,
          disableLocalStorage: true,
        }
      },
    })
  ]
});
