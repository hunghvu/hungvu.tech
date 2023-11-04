/**
 * @author Hung Vu
 *
 * ACL to check if the user is logged in to to back end.
 */

import { User } from 'types/payload-types';
import { Access, AccessArgs } from 'payload/types';

const isLoggedIn: Access<any, User> = (req: AccessArgs<any, User>) => {
  const user = req.req.user;
  return user;
};

export default isLoggedIn;
