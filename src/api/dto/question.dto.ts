import { ApiProperty } from '@nestjs/swagger';

export class QuestionDto {
  @ApiProperty({
    example: 'Who was president of the United States in 1955',
    description: 'question',
    required: true,
  })
  question: string;
}
