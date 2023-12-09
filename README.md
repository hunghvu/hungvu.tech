# Blogfolio @hungvu.tech

*This document is under active development.*

## Main services

This monorepo currently contains 2 core services: `cms` (front end), and `web` (back end).

**About `cms`**

Powered by PayloadCMS (with Express and React underneath).

**About `web`**

Powered by Next.js, PrimeReact and Tailwind.

## Infrastructure

- Platforms: AWS (VPS), Cloudflare (DNS, Storage), MongoDB Atlas (database), Docker (containers), Pulumi (IaaC)

## Requirements

The `cms` requires the following environment variables:

- PAYLOAD_MONGODB_URI
- PAYLOAD_MONGODB_DBNAME
- PAYLOAD_SECRET
- PAYLOAD_S3_ACCESS_KEY_ID
- PAYLOAD_S3_BUCKET
- PAYLOAD_S3_ENDPOINT
- PAYLOAD_S3_REGION
- PAYLOAD_S3_SECRET_ACCESS_KEY
