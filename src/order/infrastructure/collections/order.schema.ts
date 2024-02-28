import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { User } from 'src/users/infrastructure/collections/user.entity';
import { Product } from 'src/product/infrastructure/collections/product.schema';
import { v4 as uuidv4 } from 'uuid';
import { ProductOrder } from './products_in_order.schema';

type OrderStatus = 'pending' | 'completed' | 'cancelled';

@Schema()
export class Order extends Document {
  @Prop({ type: String, default: () => uuidv4(), unique: true })
  _id: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ProductOrder' }] })
  products: ProductOrder[];

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  users: User | string; // Ahora 'usuario' hace referencia directamente al esquema de 'User'

  @Prop({ required: true })
  total: number;

  @Prop({
    required: true,
    enum: ['pending', 'completed', 'cancelled'],
    default: 'pending',
  })
  status: OrderStatus;

  @Prop({ default: Date.now })
  created_at: Date;

  @Prop({ default: Date.now })
  updated_at: Date;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
