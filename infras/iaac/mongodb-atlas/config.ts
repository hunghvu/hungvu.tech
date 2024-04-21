/**
 * Author: Hung Vu
 * 
 * Initialize MongoDB Atlas provider and necessary environment variables
 */
import * as mongodbAtlas from "@pulumi/mongodbatlas";
import * as pulumi from "@pulumi/pulumi";

const config = new pulumi.Config();

const publicKey = config.requireSecret("publicKey");
const privateKey = config.requireSecret("privateKey");
const orgId = config.requireSecret("orgId");

const mongodbAtlasProvider = new mongodbAtlas.Provider("my-provider", {
  publicKey: pulumi.interpolate`${publicKey}`,
  privateKey: pulumi.interpolate`${privateKey}`,
});

export {
  mongodbAtlasProvider,
  orgId,
};

