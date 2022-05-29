import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { User } from 'src/auth/schemas/auth.schema';
import { CONDITION } from 'src/types/Condition.type';


@Schema()
export class Post {
  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  price: number;

  @Prop()
  location: string;

  @Prop()
  category: string;

  @Prop({ default: CONDITION.NEW, type: String })
  condition: CONDITION;

  @Prop({ default: true, type: String })
  isVisible: boolean;

  @Prop({ default: false, type: String })
  isActive: boolean;

  @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'User'})
  user: User

}

export const PostSchema = SchemaFactory.createForClass(Post);
