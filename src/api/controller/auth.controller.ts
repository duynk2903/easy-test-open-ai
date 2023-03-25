import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UserModel } from '../../shared/model/user.model';
import { UserService } from '../../business-layer/services/user.service';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../../business-layer/services/auth.service';
import { LoginDto } from '../dto/login.dto';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller()
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private authService: AuthService,
  ) {}
  @ApiBearerAuth('accessToken')
  @UseGuards(AuthGuard('jwt'))
  @Get('/users')
  getListUser(): UserModel[] | any {
    return this.userService.getAllUser();
  }

  @UseGuards(AuthGuard('local'))
  @Post('auth/login')
  async login(@Body() body: LoginDto) {
    return this.authService.login(body);
  }
}
