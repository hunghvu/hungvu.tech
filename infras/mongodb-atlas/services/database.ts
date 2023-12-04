/**
 * Author: Hung Vu
 * 
 * MongoDB Atlas configuration, M0 is the free tier.
 * Limitation: https://www.mongodb.com/docs/atlas/reference/free-shared-limitations/
 */

import * as mongodbAtlas from "@pulumi/mongodbatlas";
import * as _pulumi from "@pulumi/pulumi";
import * as config from "../config";

// Create a project
const project = new mongodbAtlas.Project("project", {
  orgId: config.orgId,
  name: "hungvu.tech",
}, {
  provider: config.mongodbAtlasProvider,
});

// Create a MongoDB Atlas cluster
// Helpful resource: https://github.com/mongodb/terraform-provider-mongodbatlas/issues/675
const cluster = new mongodbAtlas.Cluster("cluster", {
  projectId: project.id,
  autoScalingComputeEnabled: false,
  autoScalingComputeScaleDownEnabled: false,
  autoScalingDiskGbEnabled: false,
  backingProviderName: "AWS",
  clusterType: "REPLICASET",
  name: "payload-cms",
  providerInstanceSizeName: "M0",
  providerName: "TENANT",
  providerRegionName: "US_WEST_2",
  replicationFactor: 3,
}, { provider: config.mongodbAtlasProvider });

export const projectId = project.id;
export const clusterId = cluster.id;