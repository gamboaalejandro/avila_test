import { Result } from '../../../common/infrastructure/results/result';
import { MainCriteriaInterface } from '../../../users/domain/criterias/main_criteria.interface';
import { RepositoryInterface } from '../../../common/application/repository/repository.interface';

import MongooseConnection from '../../../common/infrastructure/mongo_singleton';
import { NotFoundException } from '@nestjs/common';
import { ProductCriteria } from '../../../product/domain/criterias/product_criteria';
import { ProductEntity } from '../../../product/domain/entities/product.entity';


export class FindProductRepository implements RepositoryInterface<MainCriteriaInterface, ProductEntity | ProductEntity[]> {
  get name(): string {
    return this.name;
  }
  constructor() {

  }

  async execute(data: any): Promise<Result<ProductEntity | ProductEntity[] >> {
  //TODO: implement logic to find products avaliable with stock> 0 in the database
    let query = {availability: true};
    if(data._id){
      query['_id'] = {_id: data._id}
    }
    if(data.name){
      query['name'] = {name: data.name}
    }
    if(data.price){
      query['price'] = {price: data.price}
    }
    if(data.stock){
      query['stock'] = {stock:  {$gt: 0}}
    }
    const products = await (await MongooseConnection.getInstance()).model('Product').find(query);
    if (products) {
      return Result.success(products);
    }
    else
      return Result.fail(new NotFoundException('Product not found'));
  }

}