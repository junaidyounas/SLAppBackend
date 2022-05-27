import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { CONDITION } from 'src/types/Condition.type';


@Schema()
export class Post extends Document {
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

  @Prop({ default: CONDITION.USED, type: String })
  condition: CONDITION;

}

export const PostSchema = SchemaFactory.createForClass(Post);
