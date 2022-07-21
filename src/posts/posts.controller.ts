import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  Query,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import {
  ApiBasicAuth,
  ApiBearerAuth,
  ApiBody,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

import { Query as ExpressQuery } from 'express-serve-static-core';

@ApiTags('Posts')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  // Create Post ===> /posts
  @UseGuards(AuthGuard())
  @ApiBearerAuth('jwt')
  @Post()
  @ApiBody({ type: CreatePostDto })
  create(@Body() createPostDto: CreatePostDto, @Req() req) {
    return this.postsService.create(createPostDto, req.user);
  }

  @Get('/my')
  @UseGuards(AuthGuard())
  @ApiBearerAuth('jwt')
  allMyPosts(@Req() req) {
    return this.postsService.getAllMyPosts(req.user);
  }

  // Get Posts ===> /posts
  @Get()
  @ApiQuery({
    name: 'search',
    required: false,
    type: String,
  })
  @ApiQuery({
    name: 'category',
    required: false,
    type: String,
  })
  @ApiQuery({
    name: 'page',
    required: false,
    type: String,
  })
  @ApiQuery({
    name: 'subCategory',
    required: false,
    type: String,
  })
  findAll(@Query() query: ExpressQuery) {
    return this.postsService.findAll(query);
  }

  // Get Post ===> /posts/:id
  @Get('/:id')
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(id);
  }

  // Update Post ===> /posts/:id
  @UseGuards(AuthGuard())
  @ApiBearerAuth('jwt')
  @Patch('/:id')
  updateById(
    @Param('id') id: string,
    @Body() updatePostDto: UpdatePostDto,
    @Req() req,
  ) {
    return this.postsService.update(id, updatePostDto, req.user);
  }

  // Delete Post ===> /posts/:id
  @UseGuards(AuthGuard())
  @ApiBearerAuth('jwt')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postsService.remove(id);
  }
}
