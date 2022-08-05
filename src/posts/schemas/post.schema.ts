import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from '../../auth/schemas/auth.schema';
import { Category } from '../../categories/schema/category.schema';
import { CONDITION } from '../../types/Condition.type';

@Schema()
export class Location {
  @Prop()
  title: string;

  @Prop({ type: String, enum: ['Point'] })
  type: string;

  @Prop({ index: '2dsphere' })
  coordinates: number[];
}

@Schema()
export class Post {
  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  price: number;

  @Prop({ type: Object, ref: 'Location', index: '2dsphere' })
  location: Location;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Category' })
  category: Category;

  @Prop()
  subCategory: string;

  @Prop({ type: String })
  condition: CONDITION;

  @Prop({ default: true, type: String })
  isVisible: boolean;

  @Prop({ default: true, type: String })
  isActive: boolean;

  @Prop()
  images: string[];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;

  @Prop()
  brand: string;

  @Prop()
  make: string;

  @Prop()
  year: number;

  @Prop()
  type: string;

  @Prop()
  deviceType: string;

  @Prop({ default: new Date() })
  createdAt: Date;
}

export const PostSchema = SchemaFactory.createForClass(Post);
