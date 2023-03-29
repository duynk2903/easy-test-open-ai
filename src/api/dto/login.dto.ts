import { ApiProperty } from '@nestjs/swagger'

/**
 * Login dto
 */
export class LoginDto {
  @ApiProperty({
    example: 'nkduy',
    description: 'username',
    type: String,
    required: true
  })
  username: string
  @ApiProperty({
    example: '!aerix123',
    description: 'password',
    type: String,
    required: true
  })
  password: string
}
