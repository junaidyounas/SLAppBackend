import { Injectable } from '@nestjs/common';
import { UploadImageDto } from './dto/upload-image.dto';

@Injectable()
export class UploadService {
  create(createUploadDto: UploadImageDto) {
    return 'This action adds a new upload';
  }

}
