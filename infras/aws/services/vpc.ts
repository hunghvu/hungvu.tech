/**
 * Author: Hung Vu
 * 
 * This file is used to create VPC resources
 * Each run will completely replace the previous resources (or state)
 * Careful when using this file
 * 
 * When deleting resources, do so via Pulumi, so Pulumi state and AWS state are in sync
 * Otherwise, if you delete resources via AWS console, Pulumi will not know about it
 * and cause errors when you try to delete resources via Pulumi
 * Reference: https://www.pulumi.com/docs/cli/commands/pulumi_state_delete/
 */

import * as awsClassic from "@pulumi/aws";
import * as awsNative from "@pulumi/aws-native";
import * as _pulumi from "@pulumi/pulumi";

// Virtual Private Cloud (VPC), is like a building network.
const vpc = new awsNative.ec2.VPC("vpc", {
  cidrBlock: "20.20.0.0/16",
  enableDnsHostnames: true,
  enableDnsSupport: true,
});

// Subnet the VPC into 2 subnets: public and private
// Availability Zone (AZ), is defined upon creation and cannot be changed,
// Must delete and recreate the subnet to change the AZ
const vpcSubnetPrivate = new awsNative.ec2.Subnet("vpc-subnet-private", {
  vpcId: vpc.id,
  cidrBlock: "20.20.1.0/24",
  availabilityZone: "us-west-2a",
});

const vpcSubnetPublic = new awsNative.ec2.Subnet("vpc-subnet-public", {
  vpcId: vpc.id,
  cidrBlock: "20.20.100.0/24",
  availabilityZone: "us-west-2b",
});

// Route Table (RT)
// Each VPC comes with a default route table (main RT), but we will create a customized one
const vpcRouteTable = new awsNative.ec2.RouteTable("vpc-rt", {
  vpcId: vpc.id,
});

// Internet Gateway (IGW)
const vpcInternetGateway = new awsNative.ec2.InternetGateway("vpc-igw", {});

// VPC and IGW Attachment (not support in AWS Native yet)
const vpcInternetGatewayAttachment = new awsClassic.ec2.InternetGatewayAttachment("vpc-igw-attachment", {
  vpcId: vpc.id,
  internetGatewayId: vpcInternetGateway.id,
});

// Route 0.0.0.0/0 to IGW (not support in AWS Native yet)
const vpcRoute = new awsClassic.ec2.Route("vpc-route", {
  routeTableId: vpcRouteTable.id,
  destinationCidrBlock: "0.0.0.0/0",
  gatewayId: vpcInternetGateway.id,
});

// Network ACL (egress and ingress rule not support in AWS Native yet)
// Private subnet is only accessible if there is a proxy in the public subnet
// Since there is no VLAN, there is no subnet isolation
const vpcNetworkAcl = new awsClassic.ec2.NetworkAcl("vpc-acl", {
  vpcId: vpc.id,
  egress: [
    // Public subnet rules
    {
      protocol: "tcp",
      ruleNo: 1,
      action: "allow",
      cidrBlock: vpcSubnetPublic.cidrBlock,
      fromPort: 80,
      toPort: 80,
    },
    {
      protocol: "tcp",
      ruleNo: 2,
      action: "allow",
      cidrBlock: vpcSubnetPublic.cidrBlock,
      fromPort: 443,
      toPort: 443,
    },
    {
      protocol: "tcp",
      ruleNo: 3,
      action: "allow",
      cidrBlock: vpcSubnetPublic.cidrBlock,
      fromPort: 27017, // MongoDB default port
      toPort: 27017,
    },

    // Private subnet rules
    {
      protocol: "-1",
      ruleNo: 1000,
      action: "deny",
      cidrBlock: vpcSubnetPrivate.cidrBlock,
      fromPort: 0,
      toPort: 0,
    }
  ],
  ingress: [
    // Public subnet rules
    {
      protocol: "tcp",
      ruleNo: 1,
      action: "allow",
      cidrBlock: vpcSubnetPublic.cidrBlock,
      fromPort: 2002, // Customized SSH port
      toPort: 2002,
    },
    {
      protocol: "tcp",
      ruleNo: 2,
      action: "allow",
      cidrBlock: vpcSubnetPublic.cidrBlock,
      fromPort: 80,
      toPort: 80,
    },
    {
      protocol: "tcp",
      ruleNo: 3,
      action: "allow",
      cidrBlock: vpcSubnetPublic.cidrBlock,
      fromPort: 443,
      toPort: 443,
    },

    // Private subnet rules
    {
      protocol: "-1",
      ruleNo: 1000,
      action: "deny",
      cidrBlock: vpcSubnetPrivate.cidrBlock,
      fromPort: 0,
      toPort: 0,
    }
  ]
});

const vpcNetworkAclAssociationPrivate = new awsClassic.ec2.NetworkAclAssociation("vpc-acl-association-private", {
  subnetId: vpcSubnetPrivate.id,
  networkAclId: vpcNetworkAcl.id,
});

const vpcNetworkAclAssociationPublic = new awsClassic.ec2.NetworkAclAssociation("vpc-acl-association-public", {
  subnetId: vpcSubnetPublic.id,
  networkAclId: vpcNetworkAcl.id,
});

export const vpcId = vpc.id;
export const vpcSubnetPrivateId = vpcSubnetPrivate.id;
export const vpcSubnetPublicId = vpcSubnetPublic.id;
export const vpcRouteTableId = vpcRouteTable.id;
export const vpcInternetGatewayId = vpcInternetGateway.id;
export const vpcInternetGatewayAttachmentId = vpcInternetGatewayAttachment.id;
export const vpcRouteId = vpcRoute.id;
export const vpcNetworkAclId = vpcNetworkAcl.id;
export const vpcNetworkAclAssociationPrivateId = vpcNetworkAclAssociationPrivate.id;
export const vpcNetworkAclAssociationPublicId = vpcNetworkAclAssociationPublic.id;