import { Body, Controller, HttpCode, Post, UseGuards } from '@nestjs/common'
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
import { AuthGuard } from '@nestjs/passport'
import { ChatService } from '../../business-layer/services/chat.service'
import { QuestionDto } from '../dto/question.dto'
import { AnswerQuestionModel } from '../../shared/model/answer.model'
import { SwaggerResponseStatusDescription } from '../../shared/enums/swagger.enum'
import { GuardEnum } from '../../shared/enums/guard.enum'
import { AuthorizationEnum } from '../../shared/enums/common.enum'

/**
 * Chat controller
 */
@Controller('/chat')
@ApiBearerAuth(AuthorizationEnum.ACCESS_TOKEN)
@UseGuards(AuthGuard(GuardEnum.JWT))
@ApiTags('Chat API')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  /**
   * Get answer base on question
   * @Length: 4000
   * @param questionInDto
   */
  @ApiOperation({
    summary: 'Answer questions based on existing knowledge.',
    description: `Q: What is human life expectancy in the United States?
    
                  A: Human life expectancy in the United States is 78 years.`
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
  @Post('/getAnswerAsText')
  async getAnswerFromQuestionBaseOnDataStore(
    @Body() questionInDto: QuestionDto
  ): Promise<AnswerQuestionModel> {
    return this.chatService.getAnswerFromQuestion(questionInDto?.question)
  }
}
