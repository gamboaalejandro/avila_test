import { IApplicationService } from '../../common/application/application-service.interface';
import { RepositoryInterface } from '../../common/application/repository/repository.interface';
import { Result } from '../../common/infrastructure/results/result';
import { UpdateOrderDto } from '../domain/dtos/update_order.dto';

export class UpdateOrderApplicationService implements IApplicationService<UpdateOrderDto, void | void[]>{
  get name(): string {
    return this.name;
  }
  constructor(private readonly updateRepository: RepositoryInterface<UpdateOrderDto,  void>) {}

  async execute(data: UpdateOrderDto): Promise<Result<void | void[]>> {

    return await this.updateRepository.execute(data);
  }
}