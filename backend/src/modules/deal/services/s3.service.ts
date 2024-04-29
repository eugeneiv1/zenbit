import { PutObjectCommand, S3Client, S3ClientConfig } from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { Config } from '../../../configs/config.type';

@Injectable()
export class S3Service {
  private client: S3Client;
  constructor(private configService: ConfigService<Config>) {
    const awsConfig = this.configService.get('aws');
    const params: S3ClientConfig = {
      region: awsConfig.region,
      credentials: {
        accessKeyId: awsConfig.accessKey,
        secretAccessKey: awsConfig.secretKey,
      },
    };
    this.client = new S3Client(params);
  }

  public async uploadFile(
    file: Express.Multer.File,
    itemType: 'deal',
    name: string,
  ): Promise<string> {
    const config = this.configService.get('aws');
    const filePath = this.buildPath(itemType, name, file.originalname);
    await this.client.send(
      new PutObjectCommand({
        Key: filePath,
        ACL: 'public-read',
        Bucket: config.bucket,
        Body: file.buffer,
      }),
    );
    return `https://zenbit-test-project.s3.eu-north-1.amazonaws.com/${filePath}`;
  }

  private buildPath(itemType: string, name: string, fileName: string): string {
    return `${itemType}/${name}/${crypto.randomUUID()}${fileName}`;
  }
}
