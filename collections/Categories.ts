/**
 * @author Hung Vu
 *
 * This collection represents articles categories.
 */

 import { CollectionConfig } from 'payload/types';

 const readQuery = {
   and: [
     {
       _status: {
         equals: 'published',
       },
     },
   ],
 };
 
 const Categories: CollectionConfig = {
   slug: 'categories',
   admin: {
     useAsTitle: 'categoriesTitle',
     defaultColumns: ['categoriesTitle', 'categoriesDescription', 'createdAt', 'updatedAt', '_status'],
   },
   access: {
     read: ({ req: { user } }) => {
       if (user) {
         return true;
       }
       return readQuery;
     },
   },
   fields: [
     {
       name: 'categoriesTitle',
       label: 'Categories Title',
       type: 'text',
       required: true,
       index: true,
       unique: true,
       minLength: 1,
       maxLength: 60,
     },
     {
       name: 'categoriesDescription',
       label: 'Categories Description',
       type: 'textarea',
       required: true,
       minLength: 1,
       maxLength: 300,
     },
   ],
   timestamps: true,
   versions: {
     drafts: true,
   },
 };
 
 export default Categories;
 