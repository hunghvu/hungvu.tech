/**
 * Author: Hung Vu
 * 
 * Download and process OpenWrt ToH database dump
 * The database dump is in CSV format, so we need to parse it
 * The data is not clean, so information are processed before inserting into the database
 */

/* eslint-disable no-promise-executor-return */
/* eslint-disable @typescript-eslint/no-loop-func */
/* eslint-disable no-console */
/* eslint-disable import/named */
/* eslint-disable no-await-in-loop */
import { parentPort } from 'worker_threads';
import AdmZip from 'adm-zip';
import { parse } from 'csv-parse/sync'
import { stringify } from 'csv-stringify/sync'
import type { Input } from 'csv-stringify/sync';
import { readFileSync, writeFileSync } from 'fs-extra';

const fetchWithExponentialBackoff = async (url: string, options: RequestInit, timeout: number, maxRetries: number): Promise<Response> => {
  while (maxRetries >= 0) {
    try {
      return await fetch(url, options);
    } catch (error) {
      if (maxRetries === 0) {
        console.error('Error: Fetch OpenWRT ToH database dump failed, no more retries.');
        throw error;
      }
      console.error(`Error: Fetch OpenWRT ToH database dump failed, retrying in ${timeout / 60} seconds.`);
      // Reference: https://stackoverflow.com/questions/951021/what-is-the-javascript-version-of-sleep#comment9130694_951057
      await new Promise(resolve => setTimeout(resolve, timeout));
      maxRetries--;
      timeout *= 2;
    }
  }
}

const downloadAndProcessOpenWrtTohDatabaseDump = async (): Promise<void> => {
  try {
    // Download the file
    const response = await fetchWithExponentialBackoff('https://openwrt.org/_media/toh_dump_tab_separated.zip', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/zip',
      },
    }, 3600, 5);

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
    const cleanedRecords = records.map((record: Record<string, string>) => {
      // Remove unnecessary fields
      delete record.device_techdata;
      delete record.picture;

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
      writeFileSync('/tmp/ToH_cleaned.csv', stringify(cleanedRecords as Input, { header: true }));
    }
    parentPort.postMessage(cleanedRecords)
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

void (async () => {
  await downloadAndProcessOpenWrtTohDatabaseDump();
})();


