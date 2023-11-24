/**
 * Author: Hung Vu
 *
 * ACL to ensure documents can be seen only when they are published
 */

const isPublished = (): any => ({
  _status: {
    equals: 'published',
  },
});

export default isPublished;
