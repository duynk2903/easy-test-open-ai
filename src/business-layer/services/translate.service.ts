import { Injectable } from '@nestjs/common'
import OpenAIInstance from '../../shared/helpers/openai.helper'
import { OpenAIModelType } from '../../shared/enums/model.enum'
import { Builder } from '../../shared/helpers/builder.helper'
import { BaseResponseTranslateModel } from '../../shared/model/translate.model'
import { CheckGrammarDto } from '../../api/dto/check-grammar.dto'
import { TranslateTextDto } from '../../api/dto/translate-text.dto'
import { StringEnum } from '../../shared/enums/common.enum'

/**
 * Translate service
 */
@Injectable()
export class TranslateService {
  /**
   * Check grammar correction with multiple language
   * @param inDto
   */
  async checkGrammarCorrection(inDto: CheckGrammarDto): Promise<BaseResponseTranslateModel> {
    const openApi = OpenAIInstance.getOpenAI()

    try {
      return await openApi
        .createCompletion({
          model: OpenAIModelType.ENGINE_003,
          prompt: `Correct this to standard ${inDto.language}: /n ${inDto.text}`,
          temperature: 0,
          max_tokens: 4000,
          top_p: 1.0,
          frequency_penalty: 0.2,
          presence_penalty: 0.0
        })
        .then((response) => response.data.choices[0])
        .then((data) => Builder<BaseResponseTranslateModel>().text(data.text).build())
    } catch (err) {
      return Builder<BaseResponseTranslateModel>().text(StringEnum.ERROR_GENERATE_RESPONSE).build()
    }
  }

  /**
   * Translate text to another language
   * @param inDto
   */
  async translateTextToAnotherLanguage(inDto: TranslateTextDto) {
    const openApi = OpenAIInstance.getOpenAI()

    try {
      return await openApi
        .createCompletion({
          model: OpenAIModelType.ENGINE_003,
          prompt: `Translate this into ${inDto.language}:\\n\\n ${inDto.text}`,
          temperature: 0,
          max_tokens: 4000,
          top_p: 1.0,
          frequency_penalty: 0.2,
          presence_penalty: 0.0
        })
        .then((response) => response.data.choices[0])
        .then((data) => Builder<BaseResponseTranslateModel>().text(data.text).build())
    } catch (err) {
      return Builder<BaseResponseTranslateModel>().text(StringEnum.ERROR_GENERATE_RESPONSE).build()
    }
  }
}
