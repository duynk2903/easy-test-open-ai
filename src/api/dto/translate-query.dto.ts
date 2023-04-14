import { ApiProperty } from '@nestjs/swagger'

/**
 * Translate text to query dto
 */
export class TranslateQueryDto {
  @ApiProperty({
    example:
      'Create a SQL request to find all users who live in California and have over 1000 credits',
    description: 'text',
    required: true
  })
  text: string
}
