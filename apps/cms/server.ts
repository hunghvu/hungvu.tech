/**
 * Author: Hung Vu
 */

import dotenv from 'dotenv';
import express from 'express';
import payload from 'payload';

dotenv.config();

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
  onInit: () => {
    payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`);
  },
});


app.listen(PAYLOAD_PORT);
