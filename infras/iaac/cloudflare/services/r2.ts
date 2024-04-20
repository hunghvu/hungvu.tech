/**
 * Author: Hung Vu
 * 
 * Cloudflare R2 Bucket configuration (S3-compatible solution)
 * Has free tier, and free egress traffic
 */

import * as cloudflare from "@pulumi/cloudflare";
import * as _pulumi from "@pulumi/pulumi";
import * as config from "../config";

const r2Bucket = new cloudflare.R2Bucket("r2", {
  accountId: config.accountId,
  location: "wnam",
  name: "hungvu-tech",
}, { provider: config.cloudflareProvider });

export const r2BucketId = r2Bucket.id;