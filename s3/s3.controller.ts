import { Controller, Get, Query } from '@nestjs/common';
import { Roles } from '../../shared/decorators/roles.decorators';
import { S3Service } from './s3.service';

const filesExtension = {
    'image/png': 'png',
    'image/jpg': 'jpg',
    'image/jpeg': 'jpeg',
    'application/pdf': 'pdf',
    'application/vnd.openxmlformats-officedocument.wordprocessingml': 'docx',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'docx'
};

@Controller('s3')
export class S3Controller {

    constructor(private s3Service: S3Service) { }

    @Get('bucket/url')
    async getS3Url(@Query("type") type: string): Promise<object> {
        const url = await this.s3Service.getS3Url(filesExtension[type]);
        return { url };
    }
}
