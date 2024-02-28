import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber, IsString } from 'class-validator';

export class productOrderDto {
  @IsString()
  @ApiProperty({ example: '5f9d4f2b4f3c4b2b4f3c4b2b',description: 'The id of the product'})
  product: string;
  @IsNumber()
  @ApiProperty({ example: 2,description: 'The quantity of the product'})
  quantity: number;
}
export class CreateOrderDto {
  @IsString({ each: true })
  @ApiProperty({ type: [productOrderDto ], example: [{ product : 'b8f4ae0b-fa0c-4173-b406-67f5107d004e', quantity: 1  }], description: 'The ids of the products' })
  product: productOrderDto[];
  @IsNumber()
  @ApiProperty({ example: 2,description: 'The quantity of the product'})
  quantity: number;
  @IsString()
  @ApiProperty({ example: '5f9d4f2b4f3c4b2b4f3c4b2b',description: 'The id of the user'})
  user: string;
}

