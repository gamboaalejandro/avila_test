import { RepositoryInterface } from '../../../common/application/repository/repository.interface';
import MongooseConnection from '../../../common/infrastructure/mongo_singleton';
import { Result } from '../../../common/infrastructure/results/result';
import { CreateUserDto } from '../../domain/dto/create_user_dto';
import { BadRequestException } from '@nestjs/common';
import { hashInterface } from '../../../common/infrastructure/utilities/encription.interface';

export class CreateRepository implements RepositoryInterface<CreateUserDto, void> {

  constructor(private readonly hashingService:hashInterface) {

  }

  async execute(data: CreateUserDto): Promise<Result<void>> {
    data.password = await this.hashingService.hashPassword(data.password);
    const isExists = await this.checkIfUserExists(data.user);
    return !(await this.checkIfUserExists(data.user)) ? Result.success(await (await MongooseConnection.getInstance()).model('User').create(data))
      : Result.fail<void>(new BadRequestException('Username already exists'));
  }

  private async checkIfUserExists(username: string): Promise<boolean> {
    const user = await (await MongooseConnection.getInstance()).model('User').findOne
    ({user: username});
    return user !== null;

  }
}