import { Injectable } from '@nestjs/common';
import { S3, Endpoint } from "aws-sdk";
import { ConfigService } from '../../shared/config/config.service';
import * as uuid from "uuid";

@Injectable()
export class S3Service {
    private s3: any;

    constructor(private configService: ConfigService) {
        this.s3 = new S3({
            endpoint: new Endpoint(configService.environment.s3.host) as any,
            region: configService.environment.s3.region,
            accessKeyId: configService.environment.s3.accessKeyId,
            secretAccessKey: configService.environment.s3.secretAccessKey,
            signatureVersion: 'v4'
        })
    }

    async getS3Url(fileExtension: string): Promise<string> {
        let url = await this.s3.getSignedUrlPromise('putObject', {
            Bucket: this.configService.environment.s3.bucket,
            Key: `pictures/${uuid.v4()}.${fileExtension}`,
            ContentType: 'application/octet-stream',
            ACL: 'public-read',
            Expires: 300
        });
        return url;
    }
}
