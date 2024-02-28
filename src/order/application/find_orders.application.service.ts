/*import { IApplicationService } from '../../common/application/application-service.interface';
import { RepositoryInterface } from '../../common/application/repository/repository.interface';
import { Result } from '../../common/infrastructure/results/result';

import { MainCriteriaInterface } from '../../users/domain/criterias/main_criteria.interface';

export class FindOrderApplicationService implements IApplicationService<MainCriteriaInterface, OrderEntity>{
  get name(): string {
    return this.name;
  }
  constructor(private readonly findRepository: RepositoryInterface<MainCriteriaInterface, OrderEntity>) {}

  async execute(data: MainCriteriaInterface): Promise<Result<OrderEntity | OrderEntity[]>> {
    return this.findRepository.execute(data);
  }
}
*/