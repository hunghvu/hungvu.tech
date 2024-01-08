/**
 * Author: Hung Vu
 * 
 * Download and process OpenWrt ToH database dump
 * The database dump is in CSV format, so we need to parse it
 * The data is not clean, so information are processed before inserting into the database
 */

import AdmZip from 'adm-zip';
import { parse } from 'csv-parse/sync'
import { stringify } from 'csv-stringify/sync'
import { readFileSync, writeFileSync } from 'fs-extra';
import { parentPort } from 'worker_threads';

const downloadAndProcessOpenWrtTohDatabaseDump = async () => {
  try {
    // Download the file
    const response = await fetch('https://openwrt.org/_media/toh_dump_tab_separated.zip',
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
    // Remove " and ' characters, which are problematic in CSV
    const csv = readFileSync('/tmp/ToH_dump_tab_separated.csv', 'utf8')
      .replace("\"", "")
      .replace("'", "");
    const records = parse(csv, {
      columns: true,
      skip_empty_lines: true,
      delimiter: '\t',
      relax_quotes: true,
    });
    const cleanedRecords = records.map((record: any) => {
      // Remove unnecessary fields
      delete record['device_techdata'];
      delete record['picture'];

      // Remove all non-alphanumeric characters
      // This is to prevent injection attack
      // Also, it is easier to search for a device
      const cleaned = Object.fromEntries(
        Object.entries(record).map(([key, value]: [string, string]) => {
          const dirtyValues = ['', ' ', '-', 'Null', 'NULL', 'other', 'http://', 'https://', 'http://-', 'https://-']
          // Standardize all unknown values
          if (value.includes('¿') || value.includes('unknown') || value.includes('Unknown') || dirtyValues.includes(value)) {
            value = 'Unknown';
          }
          // Normalize whereAvailable
          else if (value.includes('Discontinued') || value.includes('discontinued')) {
            value = 'Discontinued';
          }
          return [key, value];
        })
      );
      return cleaned;
    })
    // Write the cleaned CSV file, only in development environment
    // So that we can use LibreOffice to open it and check for errors
    if (process.env.NODE_ENV === 'development') {
      writeFileSync('/tmp/ToH_cleaned.csv', stringify(cleanedRecords, { header: true }));
    } else if (process.env.NODE_ENV === 'production') {
      parentPort.postMessage(cleanedRecords)
    }
  } catch (error) {
    console.error('Error:', error);
  }
};

downloadAndProcessOpenWrtTohDatabaseDump();


