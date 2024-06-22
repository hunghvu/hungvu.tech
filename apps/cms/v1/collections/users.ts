/**
 * Author: Hung Vu
 * 
 * This collection represents a user.
 */

import type { CollectionConfig } from 'payload/types';
import isLoggedIn from "../access/validator/is-logged-in";

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
    group: 'Global Settings',
    useAsTitle: 'email',
  },
  access: {
    read: (req) => isLoggedIn(req)
  },
  fields: [
    // Email added by default
    // Add more fields as needed
  ],
};

export default Users;
