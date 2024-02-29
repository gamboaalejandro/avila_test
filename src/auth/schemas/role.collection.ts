import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type RoleType = 'user' | 'admin';

@Schema()
export class Role extends Document {
  @Prop({ required: true, unique: true, enum: ['user', 'admin'] })
  name: RoleType;
}

export const RoleSchema = SchemaFactory.createForClass(Role);
