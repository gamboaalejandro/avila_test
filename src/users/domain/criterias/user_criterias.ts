import { MainCriteriaInterface } from './main_criteria.interface';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UserCriteria implements MainCriteriaInterface {
  @ApiProperty({ example: '1',description: 'The id of the user', required: false})

  @IsString(
{
      message: 'The id must be a string'
    }
  )
  _id: string;
  @ApiProperty({ example: 'alejo.gamboa',description: 'The user name',required: false})
  @IsString(
{
      message: 'The user name must be a string'
    }
  )
  name: string;
  @ApiProperty({ example: 'alejo.gamboa',description: 'The user name',required: false})
  @IsString(
{
      message: 'The user name must be a string'
    }
  )
  user: string;
}