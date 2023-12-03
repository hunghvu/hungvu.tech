import * as awsClassic from "@pulumi/aws";
// import * as awsNative from "@pulumi/aws-native";
import * as pulumi from "@pulumi/pulumi";
// import * as vpc from "./vpc";

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

// const ec2 = new awsClassic.ec2.Instance("ec2", {
//   ami: ami.id,
//   instanceType: "t4g.nano",
//   // vpcSecurityGroupIds: [vpc.vpcSecurityGroupId],
//   // subnetId: vpc.vpcSubnetPublicId,
//   // keyName: "my-key",
//   // tags: {
//   //   Name: "my-ec2",
//   // },
// });
export const amiId = ami.id;