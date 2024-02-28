import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateRepository } from '../repository/create_repository';
import { CreateUserDto } from '../../domain/dto/create_user_dto';
import { RepositoryInterface } from '../../../common/application/repository/repository.interface';
import { FinderRepository } from '../repository/finder_repository';
import { MainCriteriaInterface } from '../../domain/criterias/main_criteria.interface';
import { UserEntity } from '../../domain/entities/user.entity';
import { IApplicationService } from '../../../common/application/application-service.interface';
import { CreateUserApplicationService } from '../../application/create_user.application.service';
import { MyResponse } from '../../../common/infrastructure/results/response';
import { BcryptService } from '../../../common/infrastructure/utilities/encription.bcrypt';
import { UserCriteria } from '../../domain/criterias/user_criterias';

@Controller()
export class UserController {
  private readonly hashingService: BcryptService = new BcryptService();
  private readonly createUserRepository: RepositoryInterface<CreateUserDto,void> = new CreateRepository(this.hashingService);
  private readonly findUserRepository: RepositoryInterface<MainCriteriaInterface, UserEntity> = new FinderRepository();
  private readonly createService: IApplicationService<CreateUserDto, void> = new CreateUserApplicationService(this.createUserRepository);

  constructor() {}
  @ApiTags('Users')
  @Post('/users')
  async createUser(@Body() user:CreateUserDto): Promise<MyResponse<String> | void> {
    const result =await this.createService.execute(user);
    if (result.IsSuccess) {
      return MyResponse.success("Usuario creado con éxito");
    }else
    {
      return MyResponse.fail(400, result.message, result.error);
    }
  }

  @ApiTags('Users')
  @Get('/users')
  async findUser( @Query() criterias:UserCriteria): Promise<MyResponse<UserEntity | UserEntity[] > | void> {

    const result = await this.findUserRepository.execute(criterias);
    if (result.IsSuccess) {
      return MyResponse.success(result.Value);
    }else
    {
      return MyResponse.fail(404, result.message, result.error);
    }
  }
}
