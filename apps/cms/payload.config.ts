import { buildConfig } from 'payload/config';
import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { viteBundler } from "@payloadcms/bundler-vite";

import path from 'path';
import Users from './collections/Users';
import Articles from './collections/Articles';
import Media from './collections/Media';
import Tags from './collections/Tags';
import Series from './collections/Series';
import Categories from './collections/Categories';

export default buildConfig({
  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL ?? 'http://localhost:3001',
  admin: {
    user: Users.slug,
    bundler: viteBundler(),
  },
  editor: lexicalEditor({}),
  collections: [Users, Articles, Media, Tags, Series, Categories],
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
  },
  csrf: [process.env.FRONT_END_DOMAIN ?? 'http://localhost:3000'],
  cors: [process.env.FRONT_END_DOMAIN ?? 'http://localhost:3000'],
  db: mongooseAdapter({
    url: process.env.MONGODB_URI ?? 'mongodb://127.0.0.1:27017'
  })
});
