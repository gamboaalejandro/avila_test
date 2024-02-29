import { Body, Controller, Post, UseGuards, Request } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { AuthService } from '../service/auth.service';

import { LoginDto } from '../dto/login.dto';
import { MyResponse } from '../../common/infrastructure/results/response';
import { UserEntity } from '../../users/domain/entities/user.entity';
import { LocalAuthGuard } from '../jwt/locat-auth-guard';


@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('/signin')
  @ApiOperation({ summary: 'Sign in a user' })
  @ApiBody({ type: LoginDto })
  @ApiUnauthorizedResponse({ description: 'Invalid credentials' })
  async signIn(@Request() req): Promise<MyResponse<{token:string}>> {
    const token = await this.authService.login(req.user as UserEntity)
    // req.user will be set by LocalStrategy
    return MyResponse.success(token);
  }
}
