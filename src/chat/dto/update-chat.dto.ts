import { PartialType } from '@nestjs/swagger';
import { createSessionDto } from './create-session.dto';

export class UpdateChatDto extends PartialType(createSessionDto) {}
