import { IApplicationService } from '../../common/application/application-service.interface';
import { RepositoryInterface } from '../../common/application/repository/repository.interface';
import { Result } from '../../common/infrastructure/results/result';

export class DeleteOrderApplicationService implements IApplicationService<String, void | void[]>{
  get name(): string {
    return this.name;
  }
  constructor(private readonly deleteRepository: RepositoryInterface<String,  void>) {}

  async execute(id: String): Promise<Result<void | void[]>> {

    return await this.deleteRepository.execute(id);
  }
}