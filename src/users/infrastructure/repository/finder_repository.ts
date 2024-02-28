import { RepositoryInterface } from '../../../common/application/repository/repository.interface';
import MongooseConnection from '../../../common/infrastructure/mongo_singleton';
import { UserEntity } from '../../domain/entities/user.entity';
import { Result } from '../../../common/infrastructure/results/result';
import { CreateUserDto } from '../../domain/dto/create_user_dto';
import { MainCriteriaInterface } from '../../domain/criterias/main_criteria.interface';
import { NotFoundException } from '@nestjs/common';

export class FinderRepository implements RepositoryInterface<MainCriteriaInterface, UserEntity> {

  constructor() {

  }

  async execute(data: MainCriteriaInterface): Promise<Result<UserEntity>> {
  //TODO: implement the logic to find the user in the database

    let query = {};
    Object.keys(data).forEach(key => {
      // Aquí se aplica el $regex para cada campo proporcionado en el objeto de criterios
      // $options: 'i' hace que la búsqueda sea insensible a mayúsculas y minúsculas
      query[key] = { $regex: data[key], $options: 'i' };
    });

    const user = await (await MongooseConnection.getInstance()).model('User').findOne(query);
    if (user) {
      return Result.success(user);
    }
    else
      return Result.fail(new NotFoundException('User not found'));
  }
}