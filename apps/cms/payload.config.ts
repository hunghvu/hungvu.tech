/**
 * @author Hung Vu
 * 
 * Metadata for a static route.
 */

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

import path from 'path';
import Users from './collections/Users';
import Articles from './collections/Articles';
import Media from './collections/Media';
import Tags from './collections/Tags';
import Series from './collections/Series';
import CodeEditor from './blocks/CodeSnippet';
import StaticRouteMetadata from './collections/StaticRouteMetadata';

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
  csrf: [process.env.PAYLOAD_FRONT_END_DOMAIN!],
  cors: [process.env.PAYLOAD_FRONT_END_DOMAIN!],
  db: mongooseAdapter({
    url: process.env.PAYLOAD_MONGODB_URI!,
  }),
});
