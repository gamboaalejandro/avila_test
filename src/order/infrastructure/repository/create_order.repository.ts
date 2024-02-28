import { Result } from '../../../common/infrastructure/results/result';
import MongooseConnection from '../../../common/infrastructure/mongo_singleton';
import { RepositoryInterface } from '../../../common/application/repository/repository.interface';
import { CreateOrderDto } from '../../domain/dtos/create_order.dto';

export class CreateProductRepository implements RepositoryInterface<CreateOrderDto, void> {
  constructor() {}

  async execute(order: CreateOrderDto): Promise<Result<void>> {
    return Result.success(await (await MongooseConnection.getInstance()).model('Order').create(order))
  }
}