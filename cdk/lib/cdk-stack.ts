import * as cdk from 'aws-cdk-lib';
import { Source } from 'aws-cdk-lib/aws-s3-deployment';
import { Bucket, BucketProps } from 'aws-cdk-lib/aws-s3';
import { BucketDeployment, BucketDeploymentProps } from 'aws-cdk-lib/aws-s3-deployment';
import { Construct } from 'constructs';
import { Certificate } from 'aws-cdk-lib/aws-certificatemanager';
import { Distribution, ViewerProtocolPolicy, DistributionProps } from 'aws-cdk-lib/aws-cloudfront';
import { S3Origin } from 'aws-cdk-lib/aws-cloudfront-origins';
import { AttributeType, BillingMode, Table } from 'aws-cdk-lib/aws-dynamodb';
import { LambdaRestApi } from 'aws-cdk-lib/aws-apigateway';
import { Architecture, Code, Function, Runtime } from 'aws-cdk-lib/aws-lambda';

export class CdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Bucket and deployment
    const websiteBucket = new Bucket(this, 'fixtures-app-bucket', {
      bucketName: "fixtures-app-bucket"
    } as BucketProps);

    new BucketDeployment(this, "deploy-website", {
      sources: [Source.asset("../web-app/out")],
      destinationBucket: websiteBucket
    } as BucketDeploymentProps);

    new Distribution(this, "fixtures-app-distribution", {
      defaultRootObject: "index.html",
      defaultBehavior: {
        origin: new S3Origin(websiteBucket),
        viewerProtocolPolicy: ViewerProtocolPolicy.REDIRECT_TO_HTTPS
      },
      domainNames: ['fixtures.tasburghbadmintonclub.co.uk'],
      certificate: Certificate.fromCertificateArn(this, 'CertificateImported', 'arn:aws:acm:us-east-1:690085860441:certificate/16221287-405e-4ce8-90c3-0f85d79be36a')
    } as DistributionProps);

    // Table
    const fixturesTable = new Table(this, 'sp-fixtures-table', {
      tableName: 'sp-fixtures-table',
      partitionKey: {
        name: 'id',
        type: AttributeType.STRING
      },
      billingMode: BillingMode.PAY_PER_REQUEST
    })
    const teamTable = new Table(this, 'sp-teams-table', {
      tableName: 'sp-teams-table',
      partitionKey: {
        name: 'id',
        type: AttributeType.STRING
      },
      billingMode: BillingMode.PAY_PER_REQUEST
    })

    // Func
    const func = new Function(this, "sp-lambda-func", {
      functionName: 'sp-lambda-func',
      code: Code.fromAsset('../go/dist'),
      handler: 'bootstrap',
      runtime: Runtime.PROVIDED_AL2023,
      architecture: Architecture.ARM_64
    })

    // Api
    new LambdaRestApi(this, 'sp-lambda-restapi', {
      handler: func
    })

    // permissions
    fixturesTable.grantReadWriteData(func);
    teamTable.grantReadWriteData(func);
  }
}
