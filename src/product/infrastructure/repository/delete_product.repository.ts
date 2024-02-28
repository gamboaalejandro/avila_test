

import { Result } from '../../../common/infrastructure/results/result';
import MongooseConnection from '../../../common/infrastructure/mongo_singleton';
import { RepositoryInterface } from '../../../common/application/repository/repository.interface';
import { CreateProductDto } from '../../domain/dto/create_product.dto';
import { UpdateProductDto } from '../../domain/dto/update_product.dto';

export class DeleteProductRepository implements RepositoryInterface<String, void> {
  constructor() {}

  async execute(id: String): Promise<Result<void>> {
    const productUpdated = await (await MongooseConnection.getInstance()).model('Product').findOne({_id:id});
    if(!productUpdated){
      return Result.fail(new Error('Product not found'));
    }
    Result.success(await (await MongooseConnection.getInstance()).model('Product').deleteOne({_id:id}))
    return Result.success(void 0);
  }
}