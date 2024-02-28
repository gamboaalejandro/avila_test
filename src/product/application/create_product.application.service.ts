import { IApplicationService } from '../../common/application/application-service.interface';
import { CreateUserDto } from '../../users/domain/dto/create_user_dto';
import { RepositoryInterface } from '../../common/application/repository/repository.interface';
import { Result } from '../../common/infrastructure/results/result';
import { CreateProductDto } from '../domain/dto/create_product.dto';
import { BadRequestException } from '@nestjs/common';
import { ProductEntity } from '../domain/entities/product.entity';
import { v4 as uuidv4 } from 'uuid';

export class CreateProductApplicationService implements IApplicationService<CreateProductDto, void | void[]>{
  get name(): string {
    return this.name;
  }
  constructor(private readonly createRepository: RepositoryInterface<CreateProductDto,  void>) {}

  async execute(data: CreateProductDto): Promise<Result<void | void[]>> {
    const productCreated =  new ProductEntity(uuidv4(),data.name, data.description, data.price, data.stock);
    if(!productCreated.validateStock(data.stock)){
      return Result.fail(new BadRequestException('Stock must be greater than 0'));
    }
    if(!productCreated.validatePrice(data.price)){
      return Result.fail(new BadRequestException('Price must be greater than 0'));
    }
    return await this.createRepository.execute(data);
  }
}