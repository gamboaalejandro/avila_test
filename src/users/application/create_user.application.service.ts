import { IApplicationService } from '../../common/application/application-service.interface';
import { CreateUserDto } from '../domain/dto/create_user_dto';
import { RepositoryInterface } from '../../common/application/repository/repository.interface';
import { Result } from '../../common/infrastructure/results/result';

export class CreateUserApplicationService implements IApplicationService<CreateUserDto, void | void[]>{
  get name(): string {
    return this.name;
  }
  constructor(private readonly createRepository: RepositoryInterface<CreateUserDto, void>) {}

  async execute(data: CreateUserDto): Promise<Result<void | void[]>> {
    return  await this.createRepository.execute(data);
  }
}