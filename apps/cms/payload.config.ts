import { buildConfig } from 'payload/config';
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
  },
  collections: [Users, Articles, Media, Tags, Series, Categories],
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
  },
  csrf: [process.env.FRONT_END_DOMAIN ?? 'http://localhost:3000'],
  cors: [process.env.FRONT_END_DOMAIN ?? 'http://localhost:3000'],
});
