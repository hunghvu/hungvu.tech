import { CollectionConfig } from 'payload/types';

const Users: CollectionConfig = {
  slug: 'users',
  auth: {
    // TODO: enable 2FA, perhaps via Passport
    // TODO: enable email verification
    // TODO: enable password recovery (optional?)
    cookies: {
      secure: true,
      sameSite: 'none',
      domain: process.env.FRONT_END_DOMAIN! ?? 'http://localhost:3000',
    },
    tokenExpiration: 21600,
    maxLoginAttempts: 5,
    lockTime: 300,
  },
  admin: {
    useAsTitle: 'email',
  },
  access: {
    read: () => true,
  },
  fields: [
    // Email added by default
    // Add more fields as needed
  ],
};

export default Users;
