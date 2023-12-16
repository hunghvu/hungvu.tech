/**
 * Author: Hung Vu
 * 
 * Configure IAM role for EC2 instance.
 */

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

// IAM Policy that allows ssm:PutParameter
const ec2PutParameterPolicy = new awsClassic.iam.Policy("ec2PutParameterPolicy", {
  description: "Policy that allows ssm:PutParameter",
  policy: {
    Version: "2012-10-17",
    Statement: [{
      Action: "ssm:PutParameter",
      Resource: "*",
      Effect: "Allow",
    }],
  },
});

// Attach the CloudWatchAgentServerPolicy to the role
const ec2PolicyAttachment = new awsClassic.iam.PolicyAttachment("ec2CloudWatchAgentServerRoleAttachment", {
  policyArn: "arn:aws:iam::aws:policy/CloudWatchAgentServerPolicy",
  roles: [ec2Role.name],
});

// Attach the ec2PutParameterPolicy to the role
const ec2PutParameterPolicyAttachment = new awsClassic.iam.PolicyAttachment("ec2PutParameterPolicyAttachment", {
  policyArn: ec2PutParameterPolicy.arn,
  roles: [ec2Role.name],
});

// Create an EC2 instance profile for the role
export const ec2InstanceProfile = new awsClassic.iam.InstanceProfile("ec2InstanceProfile", {
  role: ec2Role.name,
});

export const ec2RoleId = ec2Role.id;
export const ec2PutParameterPolicyId = ec2PutParameterPolicy.id;
export const ec2PolicyAttachmentId = ec2PolicyAttachment.id;
export const ec2PutParameterPolicyAttachmentId = ec2PutParameterPolicyAttachment.id;
export const ec2InstanceProfileId = ec2InstanceProfile.id;
