
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

/* eslint-disable turbo/no-undeclared-env-vars */
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

// Route Table Association (RTA)
const vpcRouteTableAssociationPrivate = new awsNative.ec2.SubnetRouteTableAssociation("vpc-rta-private", {
  subnetId: vpcSubnetPrivate.id,
  routeTableId: vpcRouteTable.id,
});

const vpcRouteTableAssociationPublic = new awsNative.ec2.SubnetRouteTableAssociation("vpc-rta-public", {
  subnetId: vpcSubnetPublic.id,
  routeTableId: vpcRouteTable.id,
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

// Network ACL (egress and ingress rule, not support in AWS Native yet)
const vpcSubnetPublicNetworkAcl = new awsClassic.ec2.NetworkAcl("vpc-subnet-public-nacl", {
  vpcId: vpc.id,
  egress: [
    // Public subnet rules
    {
      protocol: "tcp",
      ruleNo: 1,
      action: "allow",
      cidrBlock: "0.0.0.0/0",
      fromPort: 80,
      toPort: 80,
    },
    {
      protocol: "tcp",
      ruleNo: 2,
      action: "allow",
      cidrBlock: "0.0.0.0/0",
      fromPort: 443,
      toPort: 443,
    },
    {
      protocol: "tcp",
      ruleNo: 3,
      action: "allow",
      cidrBlock: "0.0.0.0/0",
      fromPort: 27017, // MongoDB default port
      toPort: 27017,
    },
    {
      protocol: "icmp",
      ruleNo: 4,
      action: "allow",
      cidrBlock: "0.0.0.0/0",
      fromPort: 0,
      toPort: 0,
      icmpType: 8, // Type of ICMP request
      icmpCode: -1, // All codes of ICMP request
    },
    {
      protocol: "icmp",
      ruleNo: 5,
      action: "allow",
      cidrBlock: "0.0.0.0/0",
      fromPort: 0,
      toPort: 0,
      icmpType: 0, // Type of ICMP request
      icmpCode: -1, // All codes of ICMP request
    },
  ],
  ingress: [
    // Public subnet rules
    {
      protocol: "tcp",
      ruleNo: 1,
      action: "allow",
      cidrBlock: "0.0.0.0/0",
      fromPort: 80,
      toPort: 80,
    },
    {
      protocol: "tcp",
      ruleNo: 2,
      action: "allow",
      cidrBlock: "0.0.0.0/0",
      fromPort: 443,
      toPort: 443,
    },
    {
      protocol: "tcp",
      ruleNo: 3,
      action: "allow",
      cidrBlock: "0.0.0.0/0",
      fromPort: parseInt(process.env.PORT_SSH!), // Customized SSH port
      toPort: parseInt(process.env.PORT_SSH!),
    },
    {
      protocol: "icmp",
      ruleNo: 4,
      action: "allow",
      cidrBlock: "0.0.0.0/0",
      fromPort: 0,
      toPort: 0,
      icmpType: 8, // Type of ICMP request
      icmpCode: -1, // All codes of ICMP request
    },
    {
      protocol: "icmp",
      ruleNo: 5,
      action: "allow",
      cidrBlock: "0.0.0.0/0",
      fromPort: 0,
      toPort: 0,
      icmpType: 0, // Type of ICMP request
      icmpCode: -1, // All codes of ICMP request
    },
  ]
});

// Private subnet is only accessible if there is a proxy in the public subnet
// Since there is no VLAN, there is no subnet isolation
const vpcSubnetPrivateNetworkAcl = new awsClassic.ec2.NetworkAcl("vpc-subnet-private-nacl", {
  vpcId: vpc.id,
  egress: [
    {
      protocol: "-1",
      ruleNo: 1000,
      action: "deny",
      cidrBlock: vpcSubnetPublic.cidrBlock,
      fromPort: 0,
      toPort: 0,
    }
  ],
  ingress: [
    {
      protocol: "-1",
      ruleNo: 1000,
      action: "deny",
      cidrBlock: vpcSubnetPublic.cidrBlock,
      fromPort: 0,
      toPort: 0,
    }
  ]
});

// Network ACL Association (not support in AWS Native yet)
const vpcNetworkAclAssociationPrivate = new awsClassic.ec2.NetworkAclAssociation("vpc-acl-association-private", {
  subnetId: vpcSubnetPrivate.id,
  networkAclId: vpcSubnetPrivateNetworkAcl.id,
});

const vpcNetworkAclAssociationPublic = new awsClassic.ec2.NetworkAclAssociation("vpc-acl-association-public", {
  subnetId: vpcSubnetPublic.id,
  networkAclId: vpcSubnetPublicNetworkAcl.id,
});

export const vpcId = vpc.id;
export const vpcSubnetPrivateId = vpcSubnetPrivate.id;
export const vpcSubnetPublicId = vpcSubnetPublic.id;
export const vpcRouteTableId = vpcRouteTable.id;
export const vpcRouteTableAssociationPrivateId = vpcRouteTableAssociationPrivate.id;
export const vpcRouteTableAssociationPublicId = vpcRouteTableAssociationPublic.id;
export const vpcInternetGatewayId = vpcInternetGateway.id;
export const vpcInternetGatewayAttachmentId = vpcInternetGatewayAttachment.id;
export const vpcRouteId = vpcRoute.id;
export const vpcSubnetPrivateAclId = vpcSubnetPrivateNetworkAcl.id;
export const vpcSubnetPublicAclId = vpcSubnetPublicNetworkAcl.id;
export const vpcNetworkAclAssociationPrivateId = vpcNetworkAclAssociationPrivate.id;
export const vpcNetworkAclAssociationPublicId = vpcNetworkAclAssociationPublic.id;