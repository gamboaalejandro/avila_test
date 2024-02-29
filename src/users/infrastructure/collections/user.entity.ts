import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { Role } from '../../../auth/schemas/role.collection';
import mongoose from 'mongoose';

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

  @Prop({ required: true, enum: ['admin', 'user'] })
  role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);