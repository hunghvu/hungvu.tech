/**
 * Author: Hung Vu
 * 
 * Create an EC2 instance
 */

/* eslint-disable turbo/no-undeclared-env-vars */
import * as awsClassic from "@pulumi/aws";
import * as pulumi from "@pulumi/pulumi";
import * as iam from "./iam";
import * as vpc from "./vpc";

const ami = pulumi.output(awsClassic.ec2.getAmi({
  owners: ["amazon"],
  mostRecent: true,
  includeDeprecated: false,
  // https://docs.aws.amazon.com/cli/latest/reference/ec2/describe-images.html
  // Kinda odd that Pulumi returns an ID, but cannot find that ID via AWS Dashboard
  filters: [
    {
      name: "architecture",
      values: ["arm64"],
    },
    {
      name: "name",
      values: ["*ubuntu/images/*"]
    },
    {
      name: "description",
      values: ["* 22.04 *"], // Must include wildcard, or else, it will be an exact match => no result
    },
    {
      name: "owner-alias",
      values: ["amazon"]
    },
  ],
}))

const ec2 = new awsClassic.ec2.Instance("ec2", {
  ami: ami.id,
  instanceType: "t4g.micro",
  vpcSecurityGroupIds: [vpc.securityGroupId],
  subnetId: vpc.vpcSubnetPublicId,
  creditSpecification: {
    cpuCredits: "standard",
  },
  iamInstanceProfile: iam.ec2InstanceProfile.name,
  ipv6AddressCount: 1,
  // TODO: Config userData
  // Change SSH default port
  // Restrict SSH to only public key
  // Disable password login
  // Disable root login
  // Install Docker
  // Pull Images (web, cms, reverse proxy)
  // TBD
  userData: `
    #!/bin/bash
    ufw allow 80/tcp
    ufw allow 443/tcp
    ufw allow 443/udp
    ufw allow 27017/tcp
    ufw allow ${process.env.PORT_SSH!}/tcp
    ufw enable
  `,
});

export const amiId = ami.id;
export const ec2Id = ec2.id;