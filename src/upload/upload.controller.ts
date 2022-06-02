import { Body, Controller, Post, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { AnyFilesInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { Helper } from '../utils/file-upload.utils';
import { UploadService } from './upload.service';
@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('/image')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file', { storage: diskStorage({
    destination: Helper.destinationPath,
    filename: Helper.customFileName,
  }) }))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return {data: file.path}
  }


  @Post('/images')
  @ApiConsumes('multipart/form-data')
//   @ApiBody({
//     //type: ReasonCode,
//     description: 'Reason Code',
//     isArray: true,
//     type: 'array',
    
    
    
// })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'array', // 👈  array of files
          items: {
            type: 'string',
            format: 'binary',
          },
        },
      },
    },
  })
  @UseInterceptors(AnyFilesInterceptor({ storage: diskStorage({
    destination: Helper.destinationPath,
    filename: Helper.customFileName,
  }) }))
  uploadFiles(@UploadedFiles() files: Array<Express.Multer.File>) {
    return {data: files.map(item => item.path)}
  }

  


}
