

import { Result } from '../../../common/infrastructure/results/result';
import MongooseConnection from '../../../common/infrastructure/mongo_singleton';
import { RepositoryInterface } from '../../../common/application/repository/repository.interface';
export class DeleteOrderRepository implements RepositoryInterface<String, void> {
  constructor() {}

  async execute(id: String): Promise<Result<void>> {
    const OrderUpdated = await (await MongooseConnection.getInstance()).model('Order').findOne({_id:id});
    if(!OrderUpdated){
      return Result.fail(new Error('Order not found'));
    }
    Result.success(await (await MongooseConnection.getInstance()).model('Order').deleteOne({_id:id}))
    return Result.success(void 0);
  }
}