/**
 * Author: Hung Vu
 * 
 * Create or update OpenWRT ToH collection.
 */

/* eslint-disable no-await-in-loop */
/* eslint-disable no-console */
import payload from 'payload';
import type { OpenwrtToh } from "../../payload-types";

// The data parsed from OpenWRT ToH is not in the same format as the data in the database.
// However, they are close enough that we can use the same type.
const updateOpenwrtToh = async (message: OpenwrtToh[]): Promise<void> => {
  for (const row of message) {
    // Each day this will make about 2000 requests to the database
    // If there is no match, create a new record
    // If there is a match, update the record if there is at least one difference
    // This is expensive, or is it?
    try {
      const existing = await payload.find({
        collection: 'openwrt-toh',
        where: {
          pid: {
            // PID is indexed, so should improve performance of MongoDB
            equals: row.pid,
          }
        }
      })
      if (existing.totalDocs === 0) {
        await payload.create({
          collection: 'openwrt-toh',
          data: row,
        })
      } else {
        // Only update if there is at least one difference
        Object.entries(row).some(async ([key, value]: [string, string]) => {
          if (existing.docs[0][key] !== value) {
            await payload.update({
              collection: 'openwrt-toh',
              id: existing.docs[0].id,
              data: row
            })
            return true;
          }
          return false;
        })
      }
    } catch (error) {
      console.error('Error:', error);
    }

  }
}

export default updateOpenwrtToh;