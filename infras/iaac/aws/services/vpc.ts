
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

// Virtual Private Cloud (VPC), is like a building network.
const vpc = new awsClassic.ec2.Vpc("vpc-04132024", {
  assignGeneratedIpv6CidrBlock: true,
  cidrBlock: "20.20.0.0/16",
  enableDnsHostnames: true,
  enableDnsSupport: true,
});


const vpcSubnetPublic = new awsNative.ec2.Subnet("vpc-subnet-public-04132024", {
  vpcId: vpc.id,
  cidrBlock: "20.20.100.0/24",
  // IPv6 is manually assigned via AWS dashboard
  // There is not NAT in IPv6, so we the IP is sensitive
  // Public IPv6 is /56, and subnet is /64
  // https://docs.aws.amazon.com/whitepapers/latest/ipv6-on-aws/planning-ipv6-adoption-in-the-aws-cloud-network.html
  ipv6CidrBlock: vpc.ipv6CidrBlock.apply(cidr => `${cidr.split("/")[0]}/64`),
  assignIpv6AddressOnCreation: true,
  availabilityZone: "us-west-2b",
});

// Route Table (RT)
// Each VPC comes with a default route table (main RT), but we will create a customized one
const vpcRouteTable = new awsNative.ec2.RouteTable("vpc-rt-04132024", {
  vpcId: vpc.id,
});


const vpcRouteTableAssociationPublic = new awsNative.ec2.SubnetRouteTableAssociation("vpc-rta-public-04132024", {
  subnetId: vpcSubnetPublic.id,
  routeTableId: vpcRouteTable.id,
});

// Internet Gateway (IGW)
const vpcInternetGateway = new awsNative.ec2.InternetGateway("vpc-igw-04132024", {});

// VPC and IGW Attachment (not support in AWS Native yet)
const vpcInternetGatewayAttachment = new awsClassic.ec2.InternetGatewayAttachment("vpc-igw-attachment-04132024", {
  vpcId: vpc.id,
  internetGatewayId: vpcInternetGateway.id,
});

// Route 0.0.0.0/0 to IGW (not support in AWS Native yet)
const vpcRoute = new awsClassic.ec2.Route("vpc-route-04132024", {
  routeTableId: vpcRouteTable.id,
  destinationCidrBlock: "0.0.0.0/0",
  gatewayId: vpcInternetGateway.id,
});

const vpcRouteIpv6 = new awsClassic.ec2.Route("vpc-route-ipv6-04132024", {
  routeTableId: vpcRouteTable.id,
  destinationIpv6CidrBlock: "::/0",
  gatewayId: vpcInternetGateway.id,
});

// Network ACL (egress and ingress rule, not support in AWS Native yet)
// There must be separate Network ACL for IPv4, and IPv6
const vpcSubnetPublicNetworkAcl = new awsClassic.ec2.NetworkAcl("vpc-subnet-public-nacl-04132024", {
  vpcId: vpc.id,
  egress: [
    // IPv4 rules
    {
      protocol: "icmp",
      ruleNo: 1,
      action: "allow",
      cidrBlock: "0.0.0.0/0",
      fromPort: 0,
      toPort: 0,
      icmpType: 8,
      icmpCode: -1,
    },
    {
      protocol: "icmp",
      ruleNo: 2,
      action: "allow",
      cidrBlock: "0.0.0.0/0",
      fromPort: 0,
      toPort: 0,
      icmpType: 0, // Type of ICMP request
      icmpCode: -1, // All codes of ICMP request
    },
    {
      protocol: "tcp",
      ruleNo: 3,
      action: "allow",
      cidrBlock: "0.0.0.0/0",
      fromPort: 80,
      toPort: 80,
    },
    {
      protocol: "tcp",
      ruleNo: 4,
      action: "allow",
      cidrBlock: "0.0.0.0/0",
      fromPort: 443,
      toPort: 443,
    },
    {
      protocol: "udp", //UDP for QUIC support
      ruleNo: 5,
      action: "allow",
      cidrBlock: "0.0.0.0/0",
      fromPort: 443,
      toPort: 443,
    },
    // Allow all ephemeral ports
    // When a client connects to a server, a random port from the ephemeral port range (1024-65535) becomes the client's source port
    // Reference: https://repost.aws/knowledge-center/resolve-connection-sg-acl-inbound
    {
      protocol: "tcp",
      ruleNo: 6,
      action: "allow",
      cidrBlock: "0.0.0.0/0",
      fromPort: 1024,
      toPort: 65535,
    },

    // IPv6 rules
    {
      protocol: "icmp",
      ruleNo: 101,
      action: "allow",
      ipv6CidrBlock: "::/0",
      fromPort: 0,
      toPort: 0,
      icmpType: 8,
      icmpCode: -1,
    },
    {
      protocol: "icmp",
      ruleNo: 102,
      action: "allow",
      ipv6CidrBlock: "::/0",
      fromPort: 0,
      toPort: 0,
      icmpType: 0, // Type of ICMP request
      icmpCode: -1, // All codes of ICMP request
    },
    {
      protocol: "tcp",
      ruleNo: 103,
      action: "allow",
      ipv6CidrBlock: "::/0",
      fromPort: 80,
      toPort: 80,
    },
    {
      protocol: "tcp",
      ruleNo: 104,
      action: "allow",
      ipv6CidrBlock: "::/0",
      fromPort: 443,
      toPort: 443,
    },
    {
      protocol: "udp", //UDP for QUIC support
      ruleNo: 105,
      action: "allow",
      ipv6CidrBlock: "::/0",
      fromPort: 443,
      toPort: 443,
    },
    // Allow all ephemeral ports
    // When a client connects to a server, a random port from the ephemeral port range (1024-65535) becomes the client's source port
    // Reference: https://repost.aws/knowledge-center/resolve-connection-sg-acl-inbound
    {
      protocol: "tcp",
      ruleNo: 106,
      action: "allow",
      ipv6CidrBlock: "::/0",
      fromPort: 1024,
      toPort: 65535,
    },
  ],
  ingress: [
    // IPv4 rules
    {
      protocol: "icmp",
      ruleNo: 1,
      action: "allow",
      cidrBlock: "0.0.0.0/0",
      fromPort: 0,
      toPort: 0,
      icmpType: 8, // Type of ICMP request
      icmpCode: -1, // All codes of ICMP request
    },
    {
      protocol: "icmp",
      ruleNo: 2,
      action: "allow",
      cidrBlock: "0.0.0.0/0",
      fromPort: 0,
      toPort: 0,
      icmpType: 0, // Type of ICMP request
      icmpCode: -1, // All codes of ICMP request
    },
    {
      protocol: "tcp",
      ruleNo: 3,
      action: "allow",
      cidrBlock: "0.0.0.0/0",
      fromPort: 80,
      toPort: 80,
    },
    {
      protocol: "tcp",
      ruleNo: 4,
      action: "allow",
      cidrBlock: "0.0.0.0/0",
      fromPort: 443,
      toPort: 443,
    },
    {
      protocol: "udp",
      ruleNo: 5,
      action: "allow",
      cidrBlock: "0.0.0.0/0",
      fromPort: 443,
      toPort: 443,
    },
    {
      protocol: "tcp",
      ruleNo: 6,
      action: "allow",
      cidrBlock: process.env.WHITELISTED_IPV4_SSH!,
      fromPort: parseInt(process.env.PORT_SSH!), // Customized SSH port
      toPort: parseInt(process.env.PORT_SSH!),
    },
    {
      protocol: "tcp",
      ruleNo: 7,
      action: "allow",
      cidrBlock: "0.0.0.0/0",
      fromPort: 1024,
      toPort: 65535,
    },

    // IPv6 rules
    // https://github.com/hashicorp/terraform-provider-aws/issues/35526
    // ICMP v6 is not supported via API yet, hence invalid protocol.
    // But it is togglable via AWS Console
    // {
    //   protocol: "icmpv6",
    //   ruleNo: 101,
    //   action: "allow",
    //   ipv6CidrBlock: "::/0",
    //   fromPort: 0,
    //   toPort: 0,
    //   icmpType: 8, // Type of ICMP request
    //   icmpCode: -1, // All codes of ICMP request
    // },
    // {
    //   protocol: "icmpv6",
    //   ruleNo: 102,
    //   action: "allow",
    //   ipv6CidrBlock: "::/0",
    //   fromPort: 0,
    //   toPort: 0,
    //   icmpType: 0, // Type of ICMP request
    //   icmpCode: -1, // All codes of ICMP request
    // },
    {
      protocol: "tcp",
      ruleNo: 103,
      action: "allow",
      ipv6CidrBlock: "::/0",
      fromPort: 80,
      toPort: 80,
    },
    {
      protocol: "tcp",
      ruleNo: 104,
      action: "allow",
      ipv6CidrBlock: "::/0",
      fromPort: 443,
      toPort: 443,
    },
    {
      protocol: "udp",
      ruleNo: 105,
      action: "allow",
      ipv6CidrBlock: "::/0",
      fromPort: 443,
      toPort: 443,
    },
    {
      protocol: "tcp",
      ruleNo: 106,
      action: "allow",
      ipv6CidrBlock: process.env.WHITELISTED_IPV6_SSH!,
      fromPort: parseInt(process.env.PORT_SSH!), // Customized SSH port
      toPort: parseInt(process.env.PORT_SSH!),
    },
    {
      protocol: "tcp",
      ruleNo: 107,
      action: "allow",
      ipv6CidrBlock: "::/0",
      fromPort: 1024,
      toPort: 65535,
    },
  ]
});

const vpcNetworkAclAssociationPublic = new awsClassic.ec2.NetworkAclAssociation("vpc-acl-association-public-04132024", {
  subnetId: vpcSubnetPublic.id,
  networkAclId: vpcSubnetPublicNetworkAcl.id,
});

// Essentially stateful firewall for an EC2 instance (Security Rule, first argument cannot begin with "sg")
// Not support in AWS Native yet
const securityGroup = new awsClassic.ec2.SecurityGroup("security-group-04132024", {
  vpcId: vpc.id,
  egress: [
    // https://serverfault.com/questions/1148691/ipv6-icmp-rules-for-aws-security-group
    {
      cidrBlocks: ["0.0.0.0/0"],
      ipv6CidrBlocks: ["::/0"],
      protocol: "tcp",
      fromPort: 80,
      toPort: 80,
    },
    {
      cidrBlocks: ["0.0.0.0/0"],
      ipv6CidrBlocks: ["::/0"],
      protocol: "tcp",
      fromPort: 443,
      toPort: 443,
    },
    {
      cidrBlocks: ["0.0.0.0/0"],
      ipv6CidrBlocks: ["::/0"],
      protocol: "udp",
      fromPort: 443,
      toPort: 443,
    },
    {
      cidrBlocks: ["0.0.0.0/0"],
      ipv6CidrBlocks: ["::/0"],
      protocol: "tcp",
      fromPort: 27017, // MongoDB
      toPort: 27017,
    },
    // EC2 Instance Connect requires both ingress and eress rules for SSH
    // Public IPv4 SSH won't work after the move to Ipv6
    // but technically Instance Connect Endpoint should work, as it lives in the same VPC subnet as the EC2 instance
    {
      cidrBlocks: [process.env.WHITELISTED_IPV4_SSH!],
      ipv6CidrBlocks: [process.env.WHITELISTED_IPV6_SSH!],
      protocol: "tcp",
      fromPort: parseInt(process.env.PORT_SSH!),
      toPort: parseInt(process.env.PORT_SSH!),
    },
    // ICMP v6 is not supported via API yet, hence invalid protocol.
    // Also needs a deducated block, because different protocol
    {
      cidrBlocks: ["0.0.0.0/0"],
      protocol: "icmp",
      fromPort: 8, // Type of ICMP request
      toPort: -1, // Code of ICMP request
    },
    {
      cidrBlocks: ["0.0.0.0/0"],
      protocol: "icmp",
      fromPort: 0, // Type of ICMP request
      toPort: -1, // Code of ICMP request
    },
  ],
  ingress: [
    {
      cidrBlocks: ["0.0.0.0/0"],
      ipv6CidrBlocks: ["::/0"],
      protocol: "tcp",
      fromPort: 80,
      toPort: 80,
    },
    {
      cidrBlocks: ["0.0.0.0/0"],
      ipv6CidrBlocks: ["::/0"],
      protocol: "tcp",
      fromPort: 443,
      toPort: 443,
    },
    {
      cidrBlocks: ["0.0.0.0/0"],
      ipv6CidrBlocks: ["::/0"],
      protocol: "udp",
      fromPort: 443,
      toPort: 443,
    },
    {
      cidrBlocks: [process.env.WHITELISTED_IPV4_SSH!],
      ipv6CidrBlocks: [process.env.WHITELISTED_IPV6_SSH!],
      protocol: "tcp",
      fromPort: parseInt(process.env.PORT_SSH!),
      toPort: parseInt(process.env.PORT_SSH!),
    },
    {
      cidrBlocks: ["0.0.0.0/0"],
      protocol: "icmp",
      fromPort: 8, // Type of ICMP request
      toPort: -1, // Code of ICMP request
    },
    {
      cidrBlocks: ["0.0.0.0/0"],
      protocol: "icmp",
      fromPort: 0, // Type of ICMP request
      toPort: -1, // Code of ICMP request
    },
  ],
});

// Instance Connect Endpoint (not support in AWS Native yet)
// Used for connecting to EC2 instance via AWS Console, in a private subnet
// Useful to troubleshoot when accessing EC2 instance is problematic via Elastic IP
const vpcSubnetPublicInstanceConnectEndpoint = new awsClassic.ec2transitgateway.InstanceConnectEndpoint("vpc-ec2-subnet-public-instance-connect-endpoint-04132024", {
  subnetId: vpcSubnetPublic.id,
  securityGroupIds: [securityGroup.id],
});

export const vpcId = vpc.id;
export const vpcSubnetPublicId = vpcSubnetPublic.id;
export const vpcRouteTableId = vpcRouteTable.id;
export const vpcRouteTableAssociationPublicId = vpcRouteTableAssociationPublic.id;
export const vpcInternetGatewayId = vpcInternetGateway.id;
export const vpcInternetGatewayAttachmentId = vpcInternetGatewayAttachment.id;
export const vpcRouteId = vpcRoute.id;
export const vpcRouteIpv6Id = vpcRouteIpv6.id;
export const vpcSubnetPublicAclId = vpcSubnetPublicNetworkAcl.id;
export const vpcNetworkAclAssociationPublicId = vpcNetworkAclAssociationPublic.id;
export const securityGroupId = securityGroup.id;
export const vpcSubnetPublicInstanceConnectEndpointId = vpcSubnetPublicInstanceConnectEndpoint.id;