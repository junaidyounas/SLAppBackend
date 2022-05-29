import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';


@Schema()
export class User extends Document {
  @Prop()
  name: string;

  @Prop()
  phone: string;

  @Prop({ unique: [true, 'Email already exists'] })
  email: string;

  @Prop({ select: false })
  password: string;

  @Prop({ select: false })
  resetOtp: number;

  @Prop({ type: Date, select: false })
  resetOtpCreatedAt: string;
}

export const UserSchema = SchemaFactory.createForClass(User);