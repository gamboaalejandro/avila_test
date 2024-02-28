import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsString()
  @ApiProperty({ example: 'Alejandro Gamboa',description: 'The name of the user'})
  name: string;
  @IsString()
  @ApiProperty({ example: 'alejo.gamboa',description: 'The user name'})
  user: string;
  @IsString()
  @ApiProperty({ example: '123456',description: 'The password'})
  password: string;
}