import { Product } from 'src/product/infrastructure/collections/product.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import * as mongoose from 'mongoose';
@Schema()
export class ProductOrder extends Document {
  @Prop({ type: String, default: () => uuidv4(), unique: true })
  _id: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Product' })
  products: Product;

  @Prop({ required: true })
  quantity: number;

}

export const ProductOrderSchema = SchemaFactory.createForClass(ProductOrder);
