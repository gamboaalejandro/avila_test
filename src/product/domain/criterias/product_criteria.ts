import { IsIn, IsInt, IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { MainCriteriaInterface } from '../../../users/domain/criterias/main_criteria.interface';

export class ProductCriteria implements MainCriteriaInterface {
  @ApiProperty({ example: '1', description: 'The id of the product', required: false })
  @IsOptional()
  @IsString(
    {
      message: 'The id must be a string',
    },
  )
  _id: string;
  @ApiProperty({ example: '1', description: 'The name of the product', required: false })
  @IsOptional()
  @IsString(
    {
      message: 'The name must be a string',
    },
  )
  name: string;


  @ApiProperty({ example: 1, description: 'The price of the product', required: false })
  @IsOptional()
  @IsInt({
    message: 'Price must be an integer'
  })
  @Min(1)
  price: number;

  @ApiProperty({ example: '1', description: 'The stock of the product', required: false })
  @IsOptional()
  @IsInt({
    message: 'Price must be an integer',
  })
  @Min(1)

  stock: number;

}