import { Body, Controller, Get, HttpCode, Post, UseGuards } from '@nestjs/common'
import { UserModel } from '../../shared/model/user.model'
import { UserService } from '../../business-layer/services/user.service'
import { AuthGuard } from '@nestjs/passport'
import { AuthService } from '../../business-layer/services/auth.service'
import { LoginDto } from '../dto/login.dto'
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse
} from '@nestjs/swagger'
import { GuardEnum } from '../../shared/enums/guard.enum'
import { SwaggerResponseStatusDescription } from '../../shared/enums/swagger.enum'

/**
 * Auth controller
 */
@Controller('/auth')
@ApiTags('Authentication API')
export class AuthController {
  constructor(private readonly userService: UserService, private authService: AuthService) {}

  /**
   * Get all user from Firebase
   */
  @ApiBearerAuth('accessToken')
  @UseGuards(AuthGuard(GuardEnum.JWT))
  @ApiOperation({
    summary: 'Get list user API',
    description: 'Get all user store in application.'
  })
  @ApiOkResponse({ description: SwaggerResponseStatusDescription.OK_RESPONSE })
  @ApiBadRequestResponse({
    description: SwaggerResponseStatusDescription.BAD_REQUEST
  })
  @ApiUnauthorizedResponse({
    description: SwaggerResponseStatusDescription.UN_AUTHORIZATION_REQUEST
  })
  @ApiForbiddenResponse({
    description: SwaggerResponseStatusDescription.FORBIDDEN_REQUEST
  })
  @ApiInternalServerErrorResponse({
    description: SwaggerResponseStatusDescription.INTERNAL_SERVER_ERROR
  })
  @Get('/users')
  @HttpCode(200)
  getListUser(): UserModel[] | any {
    return this.userService.getAllUser()
  }

  /**
   * Login with username and password
   * @param body
   */
  @UseGuards(AuthGuard(GuardEnum.LOCAL))
  @ApiOperation({
    summary: 'Login user',
    description: 'Login user and return access token'
  })
  @ApiOkResponse({ description: SwaggerResponseStatusDescription.OK_RESPONSE })
  @ApiBadRequestResponse({
    description: SwaggerResponseStatusDescription.BAD_REQUEST
  })
  @ApiUnauthorizedResponse({
    description: SwaggerResponseStatusDescription.UN_AUTHORIZATION_REQUEST
  })
  @ApiForbiddenResponse({
    description: SwaggerResponseStatusDescription.FORBIDDEN_REQUEST
  })
  @ApiInternalServerErrorResponse({
    description: SwaggerResponseStatusDescription.INTERNAL_SERVER_ERROR
  })
  @HttpCode(200)
  @Post('/login')
  async login(@Body() body: LoginDto) {
    return this.authService.login(body)
  }
}
