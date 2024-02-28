import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber, IsString } from 'class-validator';

export class CreateOrderDto {
  @IsString({ each: true })
  @ApiProperty({ type: [String], example: ['5f9d4f2b4f3c4b2b4f3c4b2b'], description: 'The ids of the products' })
  product: string[];
  @IsNumber()
  @ApiProperty({ example: 2,description: 'The quantity of the product'})
  quantity: number;
  @IsString()
  @ApiProperty({ example: '5f9d4f2b4f3c4b2b4f3c4b2b',description: 'The id of the user'})
  user: string;
}