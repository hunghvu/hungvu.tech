/**
 * Author: Hung Vu
 * 
 * Download and process OpenWrt ToH database dump
 * The database dump is in CSV format, so we need to parse it
 * The data is not clean, so information are processed before inserting into the database
 */

import AdmZip from 'adm-zip';
import { parse } from 'csv-parse/sync'
import { readFileSync } from 'fs-extra';

const downloadAndProcessOpenWrtTohDatabaseDump = async () => {
  const url = 'https://openwrt.org/_media/toh_dump_tab_separated.zip';
  try {
    // Download the file
    const response = await fetch(url,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/zip',
        },
      }

    );

    // Read the file in-memory
    const zip = new AdmZip(Buffer.from(await response.arrayBuffer()));
    zip.extractAllTo('/tmp', true);

    // Read the CSV file
    const file = '/tmp/ToH_dump_tab_separated.csv'
    const csv = readFileSync(file, 'utf8');
    const records = parse(csv, {
      columns: true,
      skip_empty_lines: true,
      delimiter: '\t',
      relax_quotes: true,
    });
    const cleanedRecords = records.map((record: any) => {
      // Remove all non-alphanumeric characters
      // This is to prevent injection attack
      // Also, it is easier to search for a device
      const cleanedRecord = Object.fromEntries(
        Object.entries(record).map(([key, value]) => {
          if (typeof value === 'string') {
            const dirtyValues = [
              ['', ' ', '-', 'Null', 'NULL', 'unknown', 'http://', 'https://', 'http://-', 'https://-']
            ]
            return [key, value.includes('¿') || ['', ' ', '-', 'Null', 'NULL', 'unknown'].includes(value) ? 'Unknown' : value];
          }
          return [key, value];
        })
      );

      return cleanedRecord;
    })
    console.log(cleanedRecords)
  } catch (error) {
    console.error('Error:', error);
  }
};

downloadAndProcessOpenWrtTohDatabaseDump();


