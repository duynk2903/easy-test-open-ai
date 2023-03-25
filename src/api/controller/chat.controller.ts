import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { ChatService } from '../../business-layer/services/chat.service';
import { QuestionDto } from '../dto/question.dto';
import { AnswerQuestionModel } from '../../shared/model/answer.model';

/**
 * Chat controller
 */
@Controller()
@ApiBearerAuth('accessToken')
@UseGuards(AuthGuard('jwt'))
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  /**
   * Get answer base on question
   * @Length: 4000
   * @param questionInDto
   */
  @Post('/getAnswerAsText')
  async getAnswerFromQuestionBaseOnDataStore(
    @Body() questionInDto: QuestionDto,
  ): Promise<AnswerQuestionModel> {
    return this.chatService.getAnswerFromQuestion(questionInDto?.question);
  }
}
