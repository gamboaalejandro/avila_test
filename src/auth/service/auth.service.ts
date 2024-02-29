import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from '../dto/login.dto';
import { RepositoryInterface } from '../../common/application/repository/repository.interface';
import { MainCriteriaInterface } from '../../users/domain/criterias/main_criteria.interface';
import { UserEntity } from '../../users/domain/entities/user.entity';
import { FinderRepository } from '../../users/infrastructure/repository/finder_repository';
import { UserCriteria } from '../dto/user.criteria';
import MongooseConnection from '../../common/infrastructure/mongo_singleton';
import { query } from 'express';
import { BcryptService } from '../../common/infrastructure/utilities/encription.bcrypt';
import { hashInterface } from '../../common/infrastructure/utilities/encription.interface';
import { User } from '../../users/infrastructure/collections/user.entity';

@Injectable()
export class AuthService {
  private readonly hashingService:hashInterface  = new BcryptService();
  constructor(private jwtService: JwtService) {}

  async validateUser(login:LoginDto): Promise<any> {
    const user = await (await MongooseConnection.getInstance()).model('User').findOne({user:login.username});
    if(user && await this.hashingService.comparePassword(login.password, user.password)) {
      return user;
    }
    return null
  }

  async login(user) {
    console.log(user)
    const payload = { username: user._id, roles : user.role };
    return {
      token: this.jwtService.sign(payload),
    };
  }

  async validateToken(token: string): Promise<any> {
    return this.jwtService.verify(token);
  }
}
