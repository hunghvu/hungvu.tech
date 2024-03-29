/**
 * Author: Hung Vu
 *
 * ACL to check if the user is logged in to to back end.
 */

import type { Access, AccessArgs } from 'payload/types';
import type { User } from '../../payload-types';

const isLoggedIn: Access<any, User> = (req: AccessArgs<any, User>) => {
  const user = req.req.user;
  return user;
};

export default isLoggedIn;
