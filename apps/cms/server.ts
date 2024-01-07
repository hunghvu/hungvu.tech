/**
 * Author: Hung Vu
 */

import * as path from 'node:path';
import * as BreeWorker from '@breejs/ts-worker'
import Bree from "bree";
import dotenv from 'dotenv';
import express from 'express';
import payload from 'payload';

dotenv.config();

// Allow Bree to use TypeScript jobs, or else "cannot use import outside of module" error will be thrown
Bree.extend(BreeWorker.default)

// The cron job runs in a separate worker, so theoretically should not blocks the main thread
const bree = new Bree({
  root: path.join(__dirname, 'cron-jobs'),
  defaultExtension: process.env.TS_NODE ? 'ts' : 'js',
  acceptedExtensions: ['.ts', '.js'],
  jobs: [
    { name: 'download-and-process-openwrt-toh-database-dump', interval: process.env.NODE_ENV === 'development' ? '15s' : '24h' },
  ]
});

const PAYLOAD_PORT = process.env.PAYLOAD_PORT!;
const app = express();

// Redirect root to Admin panel
app.get('/', (_, res) => {
  res.redirect('/admin');
});

// Initialize Payload
// eslint-disable-next-line @typescript-eslint/no-floating-promises -- Following reference implementation
payload.init({
  secret: process.env.PAYLOAD_SECRET!,
  express: app,
  onInit: async () => {
    await bree.start();
    payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`);
  },
});


app.listen(PAYLOAD_PORT);
