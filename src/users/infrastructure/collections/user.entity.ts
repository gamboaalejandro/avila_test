import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

@Schema()
export class User extends Document {
  //MAKE A PROP THAT IS UUID FOR THE USER
  @Prop({ type: String, default: () => uuidv4(), unique: true })
  _id: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  user: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: Date.now })
  created_at: Date;

  @Prop({ default: Date.now })
  updated_at: Date
}

export const UserSchema = SchemaFactory.createForClass(User);