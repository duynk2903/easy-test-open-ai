import { ApiProperty } from '@nestjs/swagger'

/**
 * Check grammar dto
 */
export class CheckGrammarDto {
  @ApiProperty({
    example: 'She no went to the market.',
    description: 'text',
    required: true
  })
  text: string

  @ApiProperty({
    example: 'EN_US',
    description: 'text',
    required: true
  })
  language: string
}
