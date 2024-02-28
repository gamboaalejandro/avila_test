import { IApplicationService } from '../../common/application/application-service.interface';
import { RepositoryInterface } from '../../common/application/repository/repository.interface';
import { Result } from '../../common/infrastructure/results/result';
import { ProductEntity } from '../domain/entities/product.entity';
import { MainCriteriaInterface } from '../../users/domain/criterias/main_criteria.interface';

export class FindProductApplicationService implements IApplicationService<MainCriteriaInterface, ProductEntity>{
  get name(): string {
    return this.name;
  }
  constructor(private readonly findRepository: RepositoryInterface<MainCriteriaInterface, ProductEntity>) {}

  async execute(data: MainCriteriaInterface): Promise<Result<ProductEntity | ProductEntity[]>> {
    return this.findRepository.execute(data);
  }
}