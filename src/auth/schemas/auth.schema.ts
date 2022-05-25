import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';


@Schema()
export class User extends Document {
  @Prop()
  name: string;
  
  @Prop()
  phone: string;

  @Prop({unique: [true, 'Email already exists']})
  email: string;

  @Prop({ select: false})
  password: string;

}

export const UserSchema = SchemaFactory.createForClass(User);