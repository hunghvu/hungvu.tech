/**
 * Author: Hung Vu
 * 
 * Module entry point
 */
import * as vpc from "./vpc"
import * as ec2 from "./ec2"


// Duplicate export because service such as a VPC
// is used by other services such as EC2. However,
// Pulumi can prevent circular deployment with its 
// its own mechanism.
export { vpc, ec2 }