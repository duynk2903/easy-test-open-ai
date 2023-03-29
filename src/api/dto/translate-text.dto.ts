import { ApiProperty } from '@nestjs/swagger'

/**
 * Translate text dto
 */
export class TranslateTextDto {
  @ApiProperty({
    example: 'What rooms do you have available?',
    description: 'text',
    required: true
  })
  text: string

  @ApiProperty({
    example: 'vn',
    description: 'text',
    required: true
  })
  language: string
}
