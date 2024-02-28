import { IApplicationService } from '../../common/application/application-service.interface';
import { CreateUserDto } from '../../users/domain/dto/create_user_dto';
import { RepositoryInterface } from '../../common/application/repository/repository.interface';
import { Result } from '../../common/infrastructure/results/result';
import { CreateProductDto } from '../domain/dto/create_product.dto';
import { BadRequestException } from '@nestjs/common';
import { ProductEntity } from '../domain/entities/product.entity';
import { v4 as uuidv4 } from 'uuid';
import { UpdateProductDto } from '../domain/dto/update_product.dto';

export class DeleteProductApplicationService implements IApplicationService<String, void | void[]>{
  get name(): string {
    return this.name;
  }
  constructor(private readonly deleteRepository: RepositoryInterface<String,  void>) {}

  async execute(id: String): Promise<Result<void | void[]>> {

    return await this.deleteRepository.execute(id);
  }
}