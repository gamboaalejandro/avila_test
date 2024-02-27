import { Prop, Schema, SchemaFactory, } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Product extends Document {
  @Prop({ required: true })
  nombre: string;

  @Prop({ required: true })
  descripcion: string;

  @Prop({ required: true })
  precio: number;

  @Prop({ required: true })
  stock: number;

  @Prop({ default: true })
  disponibilidad: boolean;

  @Prop({ default: Date.now })
  fechaCreacion: Date;

  @Prop()
  fechaActualizacion: Date;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
