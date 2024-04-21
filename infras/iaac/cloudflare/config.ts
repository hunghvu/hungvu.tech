/**
 * Author: Hung Vu
 * 
 * Initialize Cloudflare provider and necessary environment variables
 */
import * as cloudflare from "@pulumi/cloudflare";
import * as pulumi from "@pulumi/pulumi";

const config = new pulumi.Config();

const accountId = config.requireSecret("accountId");
const apiToken = config.requireSecret("apiToken");
const domain = config.require("domain");
const zoneId = config.requireSecret("zoneId");

const cloudflareProvider = new cloudflare.Provider("my-provider", {
  apiToken: pulumi.interpolate`${apiToken}`,
});

export {
  accountId,
  apiToken,
  domain,
  zoneId,
  cloudflareProvider,
};

