import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, UploadedFiles } from '@nestjs/common';
import { UploadService } from './upload.service';
import { UploadImageDto } from './dto/upload-image.dto';
import { AnyFilesInterceptor, FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { Helper } from 'src/utils/file-upload.utils';
import { extname } from 'path';
@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('/images')
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
    console.log(file.path);
  }


  // @Post('/images')
  //   @ApiConsumes("multipart/form-data")
  //   @UseInterceptors(FileInterceptor('file',
  //       {
  //           storage: diskStorage({
  //               destination: './images', 
  //               filename: (req, file, cb) => {
  //                   const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('')
  //                   return cb(null, `${randomName}${extname(file.originalname)}`)
  //               }
  //           })
  //       }
  //   ))
  //   async upload(
  //       @Body() uploadDto: UploadImageDto,
  //       @UploadedFile() file: Express.Multer.File
  //   ): Promise<void>
  //   {
  //       console.log(uploadDto);
  //       console.log(file);
  //   }


}
