import { IApplicationService } from '../../common/application/application-service.interface';
import { CreateUserDto } from '../../users/domain/dto/create_user_dto';
import { RepositoryInterface } from '../../common/application/repository/repository.interface';
import { Result } from '../../common/infrastructure/results/result';

import { BadRequestException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateOrderDto } from '../domain/dtos/create_order.dto';

export class CreateOrderApplicationService implements IApplicationService<CreateOrderDto, void | void[]>{
  get name(): string {
    return this.name;
  }
  constructor(private readonly createRepository: RepositoryInterface<CreateOrderDto,  void>) {}

  async execute(data: CreateOrderDto): Promise<Result<void | void[]>> {
    return await this.createRepository.execute(data);
  }
}