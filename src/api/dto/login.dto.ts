import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    example: 'nkduy',
    description: 'username',
    required: true,
  })
  username: string;
  @ApiProperty({
    example: '!aerix123',
    description: 'password',
    required: true,
  })
  password: string;
}
