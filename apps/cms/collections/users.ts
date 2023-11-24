/**
 * Author: Hung Vu
 * 
 * This collection represents a user.
 */

import type { CollectionConfig } from 'payload/types';

const Users: CollectionConfig = {
  slug: 'users',
  // Secure cookies breaks login flow in localhost environment
  auth: process.env.NODE_ENV === 'production'
    ? {
      // TODO: enable 2FA, perhaps via Passport
      // TODO: enable email verification
      // TODO: enable password recovery (optional?)
      cookies: {
        secure: true,
        sameSite: 'none',
        domain: process.env.PAYLOAD_FRONT_END_DOMAIN!,
      },
      tokenExpiration: 21600,
      maxLoginAttempts: 5,
      lockTime: 300,
    }
    : true,
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