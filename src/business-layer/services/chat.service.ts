import { Injectable } from '@nestjs/common';
import OpenAIInstance from '../../shared/helpers/openai.helper';
import { OpenAIModelType } from '../../shared/enums/model.enum';
import { AnswerQuestionModel } from '../../shared/model/answer.model';
import { Builder } from '../../shared/helpers/builder.helper';

/**
 * Chat service
 */
@Injectable()
export class ChatService {
  /**
   * Get answer from question base on data
   * @param question
   */
  async getAnswerFromQuestion(question: string): Promise<AnswerQuestionModel> {
    try {
      const openApi = OpenAIInstance.getOpenAI();
      return await openApi
        .createCompletion({
          model: OpenAIModelType.ANSWER_QUESTION,
          prompt: question,
          temperature: 0,
          max_tokens: 4000,
          top_p: 1.0,
          frequency_penalty: 0.2,
          presence_penalty: 0.0,
        })
        .then((response) => response.data.choices[0])
        .then((data) =>
          Builder<AnswerQuestionModel>().answer(data.text).build(),
        );
    } catch (err) {
      return Builder<AnswerQuestionModel>().answer('').build();
    }
  }
}
