
import { Result } from '../../../common/infrastructure/results/result';
import MongooseConnection from '../../../common/infrastructure/mongo_singleton';
import { RepositoryInterface } from '../../../common/application/repository/repository.interface';
import { CreateProductDto } from '../../domain/dto/create_product.dto';
import { UpdateProductDto } from '../../domain/dto/update_product.dto';

export class UpdateProductRepository implements RepositoryInterface<UpdateProductDto, void> {
  constructor() {}

  async execute(product: UpdateProductDto): Promise<Result<void>> {
    const productUpdated = await (await MongooseConnection.getInstance()).model('Product').findOne({_id:product._id});
    if(!productUpdated){
      return Result.fail(new Error('Product not found'));
    }
    const {_id, ...rest} = product;
    Result.success(await (await MongooseConnection.getInstance()).model('Product').updateOne({_id:_id},rest))
    return Result.success(void 0);
  }
}