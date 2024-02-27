//create a mongo model for a standar user in a suystem
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop({ required: true })
  _name: string;

  @Prop({ required: true, unique: true })
  user: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: Date.now })
  created_at: Date;

  @Prop()
  last_login: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);