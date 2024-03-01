import { IApplicationService } from '../../common/application/application-service.interface';
import { RepositoryInterface } from '../../common/application/repository/repository.interface';
import { Result } from '../../common/infrastructure/results/result';

import { MainCriteriaInterface } from '../../users/domain/criterias/main_criteria.interface';
import { Order } from '../infrastructure/collections/order.schema';

export class FindOrderApplicationService implements IApplicationService<MainCriteriaInterface, Order>{
  get name(): string {
    return this.name;
  }
  constructor(private readonly findRepository: RepositoryInterface<MainCriteriaInterface, Order>) {}

  async execute(data: MainCriteriaInterface): Promise<Result<Order | Order[]>> {
    return this.findRepository.execute(data);
  }
}
