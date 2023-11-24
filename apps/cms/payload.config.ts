/**
 * Author: Hung Vu
 */

import path from 'path';
import { buildConfig } from 'payload/config';
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
import { viteBundler } from '@payloadcms/bundler-vite';
import Articles from './collections/articles';
import CodeEditor from './blocks/code-snippet';
import Users from './collections/users';
import Media from './collections/media';
import Series from './collections/series';
import StaticRouteMetadata from './collections/static-route-metadata';
import Tags from './collections/tags';

export default buildConfig({
  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL!,
  admin: {
    user: Users.slug,
    bundler: viteBundler(),
  },
  editor: lexicalEditor({
    features: () => [
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
      TreeviewFeature(),
      BlocksFeature({
        blocks: [CodeEditor]
      }),
    ],
  }),
  collections: [Users, Articles, Media, Tags, Series, StaticRouteMetadata],
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  graphQL: {
    disable: true,
  },
  csrf: [process.env.PAYLOAD_FRONT_END_DOMAIN!, process.env.PAYLOAD_PUBLIC_SERVER_URL!],
  cors: [process.env.PAYLOAD_FRONT_END_DOMAIN!, process.env.PAYLOAD_PUBLIC_SERVER_URL!],
  db: mongooseAdapter({
    url: process.env.PAYLOAD_MONGODB_URI!,
    connectOptions: {
      dbName: process.env.PAYLOAD_MONGODB_DBNAME!,
    }
  }),
});
