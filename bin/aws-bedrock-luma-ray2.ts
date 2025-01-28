#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { AwsBedrockLumaRay2Stack } from '../lib/aws-bedrock-luma-ray2-stack';

const app = new cdk.App();
new AwsBedrockLumaRay2Stack(app, 'AwsBedrockLumaRay2Stack', {
  env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: process.env.CDK_DEFAULT_REGION }
});