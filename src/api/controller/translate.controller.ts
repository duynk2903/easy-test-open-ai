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
import { TranslateService } from '../../business-layer/services/translate.service'
import { CheckGrammarDto } from '../dto/check-grammar.dto'
import { BaseResponseTranslateModel } from '../../shared/model/translate.model'
import { SwaggerResponseStatusDescription } from '../../shared/enums/swagger.enum'
import { TranslateTextDto } from '../dto/translate-text.dto'
import { GuardEnum } from '../../shared/enums/guard.enum'
import { AuthorizationEnum } from '../../shared/enums/common.enum'

/**
 * Translate controller
 */
@Controller('/translate')
@ApiBearerAuth(AuthorizationEnum.ACCESS_TOKEN)
@UseGuards(AuthGuard(GuardEnum.JWT))
@ApiTags('Translate API')
export class TranslateController {
  constructor(private readonly translateService: TranslateService) {}

  /**
   * Check grammar correction
   * @param inDto
   */
  @ApiOperation({
    summary: 'Corrects sentences into standard English.',
    description: `Prompt
                  Correct this to standard English:
                   She no went to the market.
                  
                  Sample response
                  She did not go to the market.`
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
  @Post('/checkGrammarCorrection')
  async checkGrammarCorrectionApi(
    @Body() inDto: CheckGrammarDto
  ): Promise<BaseResponseTranslateModel> {
    return this.translateService.checkGrammarCorrection(inDto)
  }

  /**
   * Translate language to another language
   * @param inDto
   */
  @ApiOperation({
    summary: 'Translates English text into Another language.',
    description: `Translates English text into Another language.`
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
  @Post('/translateToAnotherLanguage')
  async translateTextToAnotherLanguage(@Body() inDto: TranslateTextDto) {
    return this.translateService.translateTextToAnotherLanguage(inDto)
  }
}
