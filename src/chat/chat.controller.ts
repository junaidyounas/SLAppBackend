import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
  Query,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiBody, ApiQuery, ApiTags } from '@nestjs/swagger';
import { ChatService } from './chat.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { createSessionDto } from './dto/create-session.dto';
import { UpdateChatDto } from './dto/update-chat.dto';

import { Query as ExpressQuery } from 'express-serve-static-core';

@ApiTags('Chats')
@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  // create session => /chat/create-session
  @UseGuards(AuthGuard())
  @ApiBearerAuth('jwt')
  @Post('/create-session')
  @ApiBody({ type: createSessionDto })
  createSession(@Body() createSessionDto: createSessionDto, @Req() req) {
    return this.chatService.createSession(createSessionDto, req.user);
  }

  // get sessions => /chat/sessions
  @Get('/sessions')
  @UseGuards(AuthGuard())
  @ApiBearerAuth('jwt')
  allCurrentUserChatSessions(@Req() req) {
    return this.chatService.getAllCurrentUserChatSessions(req.user);
  }

  // create message in chat => /chat/send-message
  @Post('/send-message/:id')
  @UseGuards(AuthGuard())
  @ApiBearerAuth('jwt')
  @ApiBody({ type: CreateMessageDto })
  sendMessage(
    @Param('id') id: string,
    @Body() createMessageDto: CreateMessageDto,
  ) {
    return this.chatService.sendMessage(createMessageDto, id);
  }

  // get single session
  @Get('/session/:id')
  getSingleChatSession(@Param('id') id: string) {
    return this.chatService.findOneSessionById(id);
  }

  // get messages
  @ApiQuery({
    name: 'start',
    required: false,
    type: String,
  })
  @ApiQuery({
    name: 'end',
    required: false,
    type: String,
  })
  @Get('/messages/:id')
  getSingleChatMessages(@Param('id') id: string, @Query() query: ExpressQuery) {
    return this.chatService.getChatMessages(id, query);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateChatDto: UpdateChatDto) {
    return this.chatService.update(+id, updateChatDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.chatService.remove(+id);
  }
}
