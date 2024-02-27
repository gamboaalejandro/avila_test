import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { User } from 'src/users/infrastructure/entities/user.entity';
import { Product } from 'src/product/infrastructure/collections/product.schema';

type OrderStatus = 'pending' | 'completed' | 'cancelled';

@Schema()
export class Order extends Document {
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }] })
  productos: Product[];

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  usuario: User | string; // Ahora 'usuario' hace referencia directamente al esquema de 'User'

  @Prop({ required: true })
  total: number;

  @Prop({
    required: true,
    enum: ['pending', 'completed', 'cancelled'],
    default: 'pending',
  })
  estado: OrderStatus;

  @Prop({ default: Date.now })
  fechaCreacion: Date;

  @Prop()
  fechaActualizacion: Date;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
