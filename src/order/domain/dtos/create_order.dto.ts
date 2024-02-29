import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsJSON, IsNumber, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { User } from '../../../users/infrastructure/collections/user.entity';
import { ProductOrder } from '../../infrastructure/collections/products_in_order.schema';
import { Product } from '../../../product/infrastructure/collections/product.schema';

export class productOrderDto {
  @IsString()
  @ApiProperty({ example: '5f9d4f2b4f3c4b2b4f3c4b2b',description: 'The id of the product'})
  product: string | any;
  @IsNumber()
  @ApiProperty({ example: 2,description: 'The quantity of the product'})
  quantity: number;

  constructor (product:string | Product, quantity:number ){
    this.product = product
    this.quantity = quantity
  }
}
export class CreateOrderDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => productOrderDto)
  @ApiProperty({ type: [productOrderDto], example: [{ product : 'b8f4ae0b-fa0c-4173-b406-67f5107d004e', quantity: 1  }], description: 'The ids of the products' })
  product: productOrderDto[];
  @IsNumber()
  @ApiProperty({ example: 2,description: 'The quantity of the product'})
  quantity: number;
  @IsString()
  @ApiProperty({ example: '5f9d4f2b4f3c4b2b4f3c4b2b',description: 'The id of the user'})
  users: string | User;

  total:number;

}

