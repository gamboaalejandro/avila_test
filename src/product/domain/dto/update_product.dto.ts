import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsInt, IsString, Max, Min } from 'class-validator';

export class UpdateProductDto{

  _id: string;

  @ApiProperty({ example: 'Iphone 12', description: 'The name of the product'})
  @IsString()
  name: string;
  @ApiProperty({ example: 'The best phone', description: 'The description of the product'})
  @IsString()
  description: string;
  @ApiProperty({ example: 1000, description: 'The price of the product'})

  @IsInt()
  @Min(1)
  price: number;
  @ApiProperty({ example: 1000, description: 'Initial stock of the product'})
  @IsInt({
    message: 'Price must be an integer'
  })
  @Min(0)
  stock: number;
  @ApiProperty({ example: true, description: 'update availability of the product'})
  @IsBoolean(
    {
      message: 'The availability must be a boolean'
    }
  )
  availability: boolean;

  constructor(_id:string,name: string, description: string, price: number, stock: number){
    this._id = _id;
    this.name = name;
    this.description = description;
    this.price = price;
    this.stock = stock;
  }



}