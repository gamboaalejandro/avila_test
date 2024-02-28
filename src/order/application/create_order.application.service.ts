import { IApplicationService } from '../../common/application/application-service.interface';
import { CreateUserDto } from '../../users/domain/dto/create_user_dto';
import { RepositoryInterface } from '../../common/application/repository/repository.interface';
import { Result } from '../../common/infrastructure/results/result';
import { CreateOrderDto } from '../domain/dto/create_product.dto';
import { BadRequestException } from '@nestjs/common';
import { OrderEntity } from '../domain/entities/product.entity';
import { v4 as uuidv4 } from 'uuid';

export class CreateOrderApplicationService implements IApplicationService<CreateOrderDto, void | void[]>{
  get name(): string {
    return this.name;
  }
  constructor(private readonly createRepository: RepositoryInterface<CreateOrderDto,  void>) {}

  async execute(data: CreateOrderDto): Promise<Result<void | void[]>> {
    return await this.createRepository.execute(data);
  }
}