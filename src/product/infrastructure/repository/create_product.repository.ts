import { Result } from '../../../common/infrastructure/results/result';
import MongooseConnection from '../../../common/infrastructure/mongo_singleton';
import { RepositoryInterface } from '../../../common/application/repository/repository.interface';
import { CreateProductDto } from '../../domain/dto/create_product.dto';

export class CreateProductRepository implements RepositoryInterface<CreateProductDto, void> {
  constructor() {}

  async execute(product: CreateProductDto): Promise<Result<void>> {
    return Result.success(await (await MongooseConnection.getInstance()).model('Product').create(product))
  }
}