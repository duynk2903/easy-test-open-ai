import { Injectable } from '@nestjs/common'
import { UserService } from './user.service'
import { JwtService } from '@nestjs/jwt'

/**
 * Auth service
 */
@Injectable()
export class AuthService {
  constructor(private readonly usersService: UserService, private jwtService: JwtService) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.getUser({ username, password })
    return user ?? null
  }

  async login(user: any) {
    const payload = { username: user.username }
    return {
      access_token: this.jwtService.sign(payload)
    }
  }
}
