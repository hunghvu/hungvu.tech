import * as pulumi from "@pulumi/pulumi";
import * as awsClassic from "@pulumi/aws";

// Create an IAM role for the EC2 instance
const ec2Role = new awsClassic.iam.Role("ec2Role", {
  assumeRolePolicy: JSON.stringify({
    Version: "2012-10-17",
    Statement: [
      {
        Action: "sts:AssumeRole",
        Effect: "Allow",
        Principal: {
          Service: "ec2.amazonaws.com",
        },
      },
    ],
  }),
});

// Attach the CloudWatchAgentServerPolicy to the role
const ec2PolicyAttachment = new awsClassic.iam.PolicyAttachment("cloudWatchAgentServerRoleAttachment", {
  policyArn: "arn:aws:iam::aws:policy/CloudWatchAgentServerPolicy",
  roles: [ec2Role.name],
});

// Create an EC2 instance profile for the role
export const ec2InstanceProfile = new awsClassic.iam.InstanceProfile("ec2InstanceProfile", {
  role: ec2Role.name,
});

export const ec2RoleId = ec2Role.id;
export const ec2PolicyAttachmentId = ec2PolicyAttachment.id;
export const ec2InstanceProfileId = ec2InstanceProfile.id;
