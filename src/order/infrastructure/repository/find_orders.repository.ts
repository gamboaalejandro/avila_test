import { Result } from '../../../common/infrastructure/results/result';
import { MainCriteriaInterface } from '../../../users/domain/criterias/main_criteria.interface';
import { RepositoryInterface } from '../../../common/application/repository/repository.interface';

import MongooseConnection from '../../../common/infrastructure/mongo_singleton';
import { NotFoundException } from '@nestjs/common';
import { Order } from '../collections/order.schema';
import { OrderCriteria } from '../../domain/criteria/order.criteria';


export class FindOrderRepository implements RepositoryInterface<MainCriteriaInterface, Order | Order[]> {
  get name(): string {
    return this.name;
  }
  constructor() {

  }

  async execute(data: OrderCriteria): Promise<Result<any>> {
  //TODO: implement logic to find products avaliable with stock> 0 in the database
    const user = await (await MongooseConnection.getInstance()).model('User').findOne({_id:{ $regex: data.users, $options: 'i' }});
    let query = {};
    if(data.users){
      query['users'] = {_id: data.users};
    }

    const products = await (await MongooseConnection.getInstance()).model('Order').find({users:user._id}).populate('products')
    if (products) {
      return Result.success(products);
    }
    else
      return Result.fail(new NotFoundException('User Orders not found'));
  }

}