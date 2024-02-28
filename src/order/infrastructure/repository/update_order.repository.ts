
import { Result } from '../../../common/infrastructure/results/result';
import MongooseConnection from '../../../common/infrastructure/mongo_singleton';
import { RepositoryInterface } from '../../../common/application/repository/repository.interface';
import { UpdateOrderDto } from '../../domain/dtos/update_order.dto';

export class UpdateProductRepository implements RepositoryInterface<UpdateOrderDto, void> {
  constructor() {}

  async execute(order: UpdateOrderDto): Promise<Result<void>> {
    const productUpdated = await (await MongooseConnection.getInstance()).model('Order').findOne({_id:order._id});
    if(!productUpdated){
      return Result.fail(new Error('Product not found'));
    }
    const {_id, ...rest} = order;
    Result.success(await (await MongooseConnection.getInstance()).model('Product').updateOne({_id:_id},rest))
    return Result.success(void 0);
  }
}