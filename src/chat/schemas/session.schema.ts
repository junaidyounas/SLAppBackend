import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from 'src/auth/schemas/auth.schema';
import { Post } from 'src/posts/schemas/post.schema';

@Schema()
export class ChatSession {
  @Prop()
  lastMessage: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  senderId: User;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Post' })
  postId: Post;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  receiverId: User;

  @Prop({ default: false, type: String })
  isDeleted: boolean;

  @Prop({ default: false, type: String })
  isSelling: boolean;

  @Prop({ default: new Date() })
  createdAt: Date;

  @Prop({ default: new Date() })
  updatedAt: Date;
}

export const ChatSessionSchema = SchemaFactory.createForClass(ChatSession);
