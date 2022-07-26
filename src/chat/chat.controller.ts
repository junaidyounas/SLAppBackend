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
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { ChatService } from './chat.service';
import { createSessionDto } from './dto/create-session.dto';
import { UpdateChatDto } from './dto/update-chat.dto';

@ApiTags('Chats')
@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @UseGuards(AuthGuard())
  @ApiBearerAuth('jwt')
  @Post('/create-session')
  @ApiBody({ type: createSessionDto })
  createSession(@Body() createSessionDto: createSessionDto, @Req() req) {
    return this.chatService.createSession(createSessionDto, req.user);
  }

  @Get('/sessions')
  @UseGuards(AuthGuard())
  @ApiBearerAuth('jwt')
  allCurrentUserChatSessions(@Req() req) {
    return this.chatService.getAllCurrentUserChatSessions(req.user);
  }

  @Post()
  create(@Body() createSessionDto: createSessionDto) {
    return this.chatService.create(createSessionDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.chatService.findOne(+id);
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
