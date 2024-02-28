import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, Min } from 'class-validator';

export class CreateProductDto{
  @ApiProperty({ example: 'Iphone 12', description: 'The name of the product'})
  @IsString()
  name: string;
  @ApiProperty({ example: 'The best phone', description: 'The description of the product'})
  @IsString()
  description: string;
  @ApiProperty({ example: 1000, description: 'The price of the product'})
  @IsInt({
    message: 'Price must be an integer'
  })
  @Min(1)
  price: number;
  @ApiProperty({ example: 1000, description: 'Initial stock of the product'})
  @IsInt({
    message: 'Price must be an integer'
  })
  @Min(1)
  stock: number;

  availability: boolean = true;

  constructor(name: string, description: string, price: number, stock: number){
    this.name = name;
    this.description = description;
    this.price = price;
    this.stock = stock;
  }



}