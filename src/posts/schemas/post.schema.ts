import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { User } from '../../auth/schemas/auth.schema';
import { Category } from '../../categories/schema/category.schema';
import { CONDITION } from '../../types/Condition.type';


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

  @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Category'})
  category: Category;

  @Prop()
  subCategory: string;

  @Prop({ default: CONDITION.NEW, type: String })
  condition: CONDITION;

  @Prop({ default: true, type: String })
  isVisible: boolean;

  @Prop({ default: true, type: String })
  isActive: boolean;

  @Prop()
  images: string[];

  @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'User'})
  user: User

}

export const PostSchema = SchemaFactory.createForClass(Post);
